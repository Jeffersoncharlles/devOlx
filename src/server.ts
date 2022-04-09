import express, { json, Request, Response, urlencoded } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const server = express();

server.use(json());
server.use(cors());
server.use(urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, '../public')));

server.get('/ping', (req: Request, res: Response) => {
    res.json({ pong: true })
});

server.listen(process.env.PORT, () => {
    console.log(`⚡[start]:🚀 ${process.env.BASE}${process.env.PORT}`)
})