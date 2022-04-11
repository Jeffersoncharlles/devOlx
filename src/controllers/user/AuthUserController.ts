import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";


class AuthUserController {
    async handle(req: Request, res: Response) {
        const auth = new AuthUserService()
        const { email, password } = req.body
        const response = await auth.execute({ email, password })

        return res.json(response)
    }
}

export { AuthUserController }