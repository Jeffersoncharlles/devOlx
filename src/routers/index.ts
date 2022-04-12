import { Router } from "express";
import multer from 'multer';
import { CreateAdController } from "../controllers/ad/CreateAdController";
import { ListCategoryController } from "../controllers/category/ListCategoryController";
import { ListStateController } from "../controllers/state/ListStateController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { CreateUserController } from "../controllers/user/CreateUserController";
import { ProfileUpdateUserController } from "../controllers/user/ProfileUpdateUserController";
import { ProfileUserInfoController } from "../controllers/user/ProfileUserInfoController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import uploadConfig from '../middlewares/upload'
import { signupValidate } from "../middlewares/validators/validators";


const listStatesController = new ListStateController();
const authUserController = new AuthUserController();
const createUserController = new CreateUserController()
const profileUserInfoController = new ProfileUserInfoController()
const profileUpdateUserController = new ProfileUpdateUserController()
const listCategoryController = new ListCategoryController()
const createAdController = new CreateAdController()



const routers = Router()
const upload = multer(uploadConfig);

routers.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

routers.get('/states', listStatesController.handle)

//---- ROTAS USER ---//
routers.post('/user/signup', createUserController.handle)
routers.post('/user/session', authUserController.handle)
routers.get('/user/me', ensureAuthenticate, profileUserInfoController.handle)
routers.put('/user/me', ensureAuthenticate, profileUpdateUserController.handle)

//---- ROTAS CATEGORY ---//
routers.get('/categories', listCategoryController.handle)

//---- ROTAS AD ---//
routers.post('/ad/add', upload.array('img', 8), ensureAuthenticate, createAdController.handle)


export { routers }