import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { authRouter, commentRouter, postRouter, usersRouter } from './routes/routers.js';


import isAuthenticated from './midlewares/isAuthenticated.js';
import { decrypterToken } from './helpers/functions/tokenEncryption.js';


dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

// using midlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(fileUpload({}));

// using routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', isAuthenticated, postRouter);
app.use('/api/comments', isAuthenticated, commentRouter);
app.all('*', (_req, res) => {
    return res.status(404).json({ msg: 'route does not exist' })
})

const server = app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});