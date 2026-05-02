import dotenv from 'dotenv';
import path from 'path';

// Load .env from the Backend root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || 'liyontawebshop';
