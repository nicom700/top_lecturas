import dotenv from 'dotenv';

dotenv.config();

export default {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost',
    MONGO_STRING: process.env.MONGO_STRING || '',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
}