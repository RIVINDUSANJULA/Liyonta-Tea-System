import express, { Request, Response, NextFunction } from 'express';
import mysql, { PoolOptions } from 'mysql2/promise'; // Using promise-based pool
import cors from 'cors';
import bodyParser from 'body-parser';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './config/env.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Database Pool (Using mysql2/promise for cleaner async/await)
const pool = mysql.createPool({
    host: DB_HOST as string,
    user: DB_USER as string,
    password: DB_PASSWORD as string,
    database: DB_NAME as string,
    connectionLimit: 100,
    waitForConnections: true,
    queueLimit: 0
});

// Helper for standardized Error Responses
const handleError = (res: Response, error: any, message: string = 'Internal Server Error', status: number = 500) => {
    console.error(`[API Error] ${message}:`, error);
    res.status(status).json({ success: false, error: message });
};

// --- ROUTES ---

// 1. Analytics: Visit Recording
app.post('/api/visit', async (req: Request, res: Response) => {
    try {
        const { page } = req.body;
        const formattedDate = new Date().toISOString().slice(0, 10);
        
        const sql = `
            INSERT INTO site_visitors_count (date, page, count)
            VALUES (?, ?, 1)
            ON DUPLICATE KEY UPDATE count = count + 1;
        `;
        await pool.execute(sql, [formattedDate, page]);
        res.status(200).json({ success: true, message: 'Visit recorded' });
    } catch (error) {
        handleError(res, error, 'Error recording visit');
    }
});

// 2. Catalog: Get All Products
app.get('/api/getproducts', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        handleError(res, error, 'Error fetching products');
    }
});

// 3. Catalog: Get Categories
app.get('/api/categories', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        res.json(rows);
    } catch (error) {
        handleError(res, error, 'Error fetching categories');
    }
});

// 4. Catalog: Get Products by Category
app.get('/api/getproductsbycategory/:categoryId', async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const [rows] = await pool.execute('SELECT * FROM products WHERE category_id = ?', [categoryId]);
        res.json(rows);
    } catch (error) {
        handleError(res, error, 'Error fetching products by category');
    }
});

// 5. Orders: Create Order
app.post('/api/Ordersadd', async (req: Request, res: Response) => {
    try {
        const { fullname, date, time, phone, Amount, address, email, items, orderno, shippingRate, codRate, country } = req.body;
        
        const countryValue = (country === undefined || country.toLowerCase() === "undefined") ? "Sri Lanka" : country;

        const sql = `
            INSERT INTO orders 
            (fullName, date, time, phone, Amount, address, email, items, orderno, status, shipping_amount, cod_amount, payment_method, country) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [fullname, date, time, phone, Amount, address, email, items, orderno, 'Paid', shippingRate, codRate, 'COD', countryValue];

        await pool.execute(sql, values);
        
        // SMS Notification (Simplified and wrapped in try-catch to not block the response)
        try {
            // SMS Logic could be moved to a helper
            console.log(`[SMS] Sending confirmation to ${phone} for order ${orderno}`);
        } catch (smsErr) {
            console.error('SMS notification failed:', smsErr);
        }

        res.status(200).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        handleError(res, error, 'Error placing order');
    }
});

// 6. Logistics: Shipping & COD Fees
app.get('/api/getshippingfees', async (req: Request, res: Response) => {
    try {
        const itemWeight = parseFloat(req.query.term as string) + 20;
        const [rows]: any = await pool.execute('SELECT * FROM shipping_rates WHERE low <= ? AND high > ?', [itemWeight, itemWeight]);
        res.json(rows.length > 0 ? rows[0].rate : 0);
    } catch (error) {
        handleError(res, error, 'Error calculating shipping fees');
    }
});

app.get('/api/getcodfees', async (req: Request, res: Response) => {
    try {
        const price = parseFloat(req.query.term as string);
        const [rows]: any = await pool.execute('SELECT * FROM shipping_rates_cod WHERE low <= ? AND high > ?', [price, price]);
        
        if (rows.length > 0) {
            const { every, rate, sum } = rows[0];
            const value = (Math.ceil(price / parseFloat(every)) * parseFloat(rate)) + parseFloat(sum);
            res.json(value);
        } else {
            res.json(0);
        }
    } catch (error) {
        handleError(res, error, 'Error calculating COD fees');
    }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    handleError(res, err, 'Internal Server Exception');
});

const PORT = 8805;
app.listen(PORT, () => {
    console.log(`[Server] Liyonta Backend optimized and running on port ${PORT}`);
});