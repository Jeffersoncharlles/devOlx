import { Router } from "express";
import multer from 'multer';
import { ListStateController } from "../controllers/state/ListStateController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { CreateUserController } from "../controllers/user/CreateUserController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import uploadConfig from '../middlewares/upload'
import { signupValidate } from "../middlewares/validators/validators";


const listStatesController = new ListStateController();
const authUserController = new AuthUserController();
const createUserController = new CreateUserController()



const routers = Router()
const upload = multer(uploadConfig);

routers.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

routers.get('/states', listStatesController.handle)

//---- ROTAS USER ---//
routers.post('/user/signup', createUserController.handle)
routers.post('/user/session', signupValidate, ensureAuthenticate, authUserController.handle)



export { routers }