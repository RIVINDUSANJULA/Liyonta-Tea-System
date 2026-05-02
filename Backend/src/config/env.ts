import path from 'path';

// Note: Node 20.6+ supports loading .env files natively via --env-file flag.
// This file just exports the variables from process.env.

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || 'liyontawebshop';
