import express from 'express';
import 'express-async-errors'
import { connectDB } from './database';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { routers } from './routers';
import { errorsMiddlewares } from './middlewares/errors';

dotenv.config();
connectDB()

const app = express();

app.use(express.json());
app.use(cors());
app.use(routers)

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(errorsMiddlewares)

app.listen(process.env.PORT || 2052, () => console.log(`⚡[start]:🚀 ${process.env.BASE}${process.env.PORT}`))