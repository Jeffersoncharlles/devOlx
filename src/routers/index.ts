import { Router } from "express";
import multer from 'multer';
import { ListStateController } from "../controllers/state/ListStateController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import uploadConfig from '../middlewares/upload'

const listStatesController = new ListStateController();
const authUserController = new AuthUserController();



const routers = Router()
const upload = multer(uploadConfig);

routers.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

routers.get('/states', listStatesController.handle)
routers.post('/user/signin', authUserController.handle)


export { routers }