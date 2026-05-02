import express, { Request, Response } from 'express';
import mysql, { PoolOptions, RowDataPacket } from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

// Assuming your env.js exports strings. 
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './config/env';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const dbConfig: PoolOptions = {
    host: DB_HOST as string,
    user: DB_USER as string,
    password: DB_PASSWORD as string,
    database: DB_NAME as string,
    connectionLimit: 100
};

const pool = mysql.createPool(dbConfig);

const loginUrl = 'https://bsms.hutch.lk/api/login';
const smsUrl = 'https://bsms.hutch.lk/api/sendsms';
const username = 'viduliyanage7@gmail.com';
const password = 'gh##43QB';

const loginData = {
    username: username,
    password: password
};

// Headers for login
const loginHeaders = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'X-API-VERSION': 'v1'
};

const currentDate = new Date();

// Extract year, month, and day
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so we add 1
const day = String(currentDate.getDate()).padStart(2, '0');

// Format the date as YYYY-MM-DD
const formattedDate = `${year}-${month}-${day}`;

// Interfaces for request bodies to ensure type safety
interface VisitRequestBody {
    page: string;
}

interface UpdateOrderNoBody {
    completedate: string;
    billno: string;
    month: string;
}

interface OrderAddBody {
    fullname: string;
    date: string;
    time: string;
    phone: string;
    Amount: number | string;
    address: string;
    email: string;
    items: string;
    orderno: string;
    shippingRate: number;
    codRate: number;
    country?: string;
}

interface UpdateInventoryBody {
    productstock: number;
}


app.post('/api/visit', async (req: Request<{}, {}, VisitRequestBody>, res: Response): Promise<void> => {
    const { page } = req.body;

    const sql = `
    INSERT INTO site_visitors_count (date, page, count)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE count = count + 1;
  `;

    pool.query(sql, [formattedDate, page], (err: any) => {
        if (err) {
            console.error('Error recording visit:', err);
            res.status(500).send('Error recording visit');
            return;
        }
        res.status(200).send('Visit recorded successfully');
    });
});

app.get('/api/getproducts', (req: Request, res: Response): void => {
    const query = 'SELECT * FROM products';

    pool.query(query, (error: any, results: any) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error fetching data from the database');
            return;
        }

        res.json(results);
    });
});

app.get('/api/orderno', async (req: Request, res: Response): Promise<void> => {
    const query = 'SELECT * FROM orderno';

    pool.query(query, (error: any, results: any) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error fetching data from the database');
            return;
        }

        res.json(results);
    });
});

app.put('/api/updateorderno/:id', async (req: Request<{ id: string }, {}, UpdateOrderNoBody>, res: Response): Promise<void> => {
    const { id } = req.params;
    const completedate = req.body.completedate;
    const billno = req.body.billno;
    const month = req.body.month;

    const sql = `UPDATE orderno SET billno = ?, month = ?, completedate = ? WHERE id = ?`;
    pool.query(sql, [billno, month, completedate, id], (err: any) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating data');
        } else {
            res.status(200).send('Data updated successfully');
        }
    });
});

app.post('/api/Ordersadd', async (req: Request<{}, {}, OrderAddBody>, res: Response): Promise<void> => {
    let phone = req.body.phone;

    const sql = 'INSERT INTO orders (fullName, date, time, phone, Amount, address, email, items, orderno, status, shipping_amount, cod_amount, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
        req.body.fullname,
        req.body.date,
        req.body.time,
        phone,
        req.body.Amount,
        req.body.address,
        req.body.email,
        req.body.items,
        req.body.orderno,
        'Paid',
        req.body.shippingRate,
        req.body.codRate,
        'COD'
    ];

    pool.query(sql, values, (err: any) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        console.log('Data inserted successfully');
        res.status(200).send('Data inserted successfully');
    });

    try {
        axios.post(loginUrl, loginData, { headers: loginHeaders })
            .then((loginResponse: any) => {
                const accessToken = loginResponse.data.accessToken;
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'X-API-VERSION': 'v1',
                    'Authorization': 'Bearer ' + accessToken
                };

                // Request body for sending SMS
                const smsData = {
                    campaignName: 'viduliyanage7@gmail.com_03042024_194248',
                    mask: 'Liyonta Tea',
                    numbers: phone,
                    content: `Hey ${req.body.fullname}, your order with order number ${req.body.orderno} is confirmed! For assistance, contact us at 0412282268 or 0413130665.`
                };

                // Send SMS using obtained access token
                axios.post(smsUrl, smsData, { headers })
                    .then((response: any) => {
                        console.log('Response:', response.data);
                    })
                    .catch((error: any) => {
                        console.error('Error:', error);
                    });
            })
            .catch((loginError: any) => {
                console.error('Login Error:', loginError);
            });

        let countryValue = req.body.country;

        // Check if the country is undefined or "undefined" string
        if (countryValue === undefined || countryValue.toLowerCase() === "undefined") {
            countryValue = "Sri Lanka";
        }
    } catch (error) {
        console.log(error);
    }
});

app.put('/api/updateinventory/:productname', async (req: Request<{ productname: string }, {}, UpdateInventoryBody>, res: Response): Promise<void> => {
    const { productname } = req.params;
    const productstock = req.body.productstock;

    const sql = `UPDATE products SET productstock = ? WHERE productname = ?`;
    pool.query(sql, [productstock, productname], (err: any) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating data');
        } else {
            res.status(200).send('Data updated successfully');
        }
    });
});

app.get('/api/getshippingfees', async (req: Request<{}, {}, {}, { term: string }>, res: Response): Promise<void> => {
    const itemWeight = parseFloat(req.query.term) + 20;

    const sql = `SELECT * FROM shipping_rates WHERE low <= ? AND high > ?`;

    pool.query(sql, [itemWeight, itemWeight], (err: any, result: any) => {
        if (err) {
            console.error('Error fetching shipping rates:', err);
            res.status(500).send('Error fetching shipping rates');
            return;
        }

        // Defaulting to 0 if no rate is found to prevent crashing
        const rate = result.length > 0 ? result[0].rate : 0;
        res.json(rate);
    });
});

app.get('/api/getcodfees', async (req: Request<{}, {}, {}, { term: string }>, res: Response): Promise<void> => {
    const price = parseFloat(req.query.term);

    const sql = `SELECT * FROM shipping_rates_cod WHERE low <= ? AND high > ?`;

    pool.query(sql, [price, price], (err: any, result: any) => {
        if (err) {
            console.error('Error fetching COD fees:', err);
            res.status(500).send('Error fetching COD fees');
            return;
        }

        if (result.length > 0) {
            const { every, rate, sum } = result[0];
            const value = (Math.ceil(price / parseFloat(every)) * parseFloat(rate)) + parseFloat(sum);
            res.json(value);
        } else {
            res.json(0); // Fallback if no matching tier is found
        }
    });
});

app.listen(8801, () => {
    console.log("listening on port 8801");
});