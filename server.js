import express from 'express';
import userRouter from './routes/user.routes.js';
import bookRouter from './routes/books.routes.js';
import { db } from './config/db.config.js';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
const corsOptions={
    origin:[
        'http://localhost:5173'
    ],
    optionsSuccessStatus: 200
}

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use('/api/v1', userRouter);
app.use('/api/v1', bookRouter);

db();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})