import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(config.SERVER_PORT, () => {
    console.log(`Server port: ${config.SERVER_PORT}`);
    console.log('----------------------------------------------------------------');
});