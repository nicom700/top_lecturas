import dotenv from 'dotenv';

dotenv.config();

export default {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    DB_NAME: process.env.DB_NAME || '',
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS || '',
    DB_PORT: process.env.DB_PORT || '',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
}