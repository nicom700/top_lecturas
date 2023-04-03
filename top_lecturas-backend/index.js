import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyparser from 'body-parser';
import config from './config.js';
import apiRoutes from './routes/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use('/api', apiRoutes);
app.use(errorMiddleware);

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGO_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

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
