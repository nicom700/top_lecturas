import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config.js';
import apiRoutes from './routes/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api', apiRoutes);
app.use(errorMiddleware);

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGO_STRING).then(() => {

    console.log('----------------------------------------------------------------');
    console.log('Conectado a MongoDB');
    console.log('----------------------------------------------------------------');

    app.listen(config.SERVER_PORT, () => {
        console.log(`Server port: ${config.SERVER_PORT}`);
        console.log('----------------------------------------------------------------');
    });

}).catch(() => {
    console.log('Error de conexion a MongoDB');
});
