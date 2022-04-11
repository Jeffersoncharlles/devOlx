import { Request, Response } from "express";
import { ProfileUpdateUserService } from "../../services/user/ProfileUpdateUserService";

class ProfileUpdateUserController {
    async handle(req: Request, res: Response) {
        const profile = new ProfileUpdateUserService()
        const { name, email, state, password } = req.body;
        const id = req.user_id
        const response = await profile.execute({ id, name, email, state, password })
        return res.json(response)

    }
}

export { ProfileUpdateUserController }