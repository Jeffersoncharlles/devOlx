import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { CreateUserService } from "../../services/user/CreateUserService";


class CreateUserController {
    async handle(req: Request, res: Response) {
        const user = new CreateUserService()

        // const errors = validationResult(req.body)
        // if (!errors.isEmpty()) {
        //     console.log('chegou')
        //     return res.json({ error: errors.mapped() })
        // }
        const { email, name, password, state } = req.body;
        const response = await user.execute({ email, name, password, state })
        return res.json(response)
    }
}

export { CreateUserController }