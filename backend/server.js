import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter, commentRouter, postRouter, usersRouter } from './routes/routers.js'
import multer from 'multer';


dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

// using midlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());

// using routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

const server = app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});