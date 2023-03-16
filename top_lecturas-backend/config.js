import dotenv from 'dotenv';

dotenv.config();

export default {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    MONGO_STRING: process.env.MONGO_STRING || '',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
}