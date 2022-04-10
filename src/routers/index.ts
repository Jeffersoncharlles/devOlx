import { Router } from "express";
import multer from 'multer';
import uploadConfig from '../middlewares/upload'


const routers = Router()
const upload = multer(uploadConfig);

routers.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})


export { routers }