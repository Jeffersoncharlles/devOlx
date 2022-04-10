import express from 'express';
import { connectDB } from './database';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { routers } from './routers';

dotenv.config();
connectDB()

const app = express();

app.use(express.json());
app.use(cors());
app.use(routers)

app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(process.env.PORT, () => console.log(`⚡[start]:🚀 ${process.env.BASE}${process.env.PORT}`))