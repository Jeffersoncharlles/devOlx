import express from 'express';
import 'express-async-errors'
import { connectDB } from './src/database';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { routers } from './src/routers';
import { errorsMiddlewares } from './src/middlewares/errors';
const images = express.static(path.resolve(__dirname, 'public'))

dotenv.config();
connectDB()

const app = express();

app.use(express.json());
app.use(cors());
app.use(routers)

app.use('/public', images);
app.use(errorsMiddlewares)

app.listen(process.env.PORT || 2052, () => console.log(`⚡[start]:🚀 ${process.env.BASE}${process.env.PORT}`))