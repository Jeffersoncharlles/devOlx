import { Request, Response } from "express";
import { ProfileUserInfoService } from "../../services/user/ProfileUserInfoService";


class ProfileUserInfoController {
    async handle(req: Request, res: Response) {
        const profile = new ProfileUserInfoService()
        const id = req.user_id
        const response = await profile.execute({ id })
        return res.json(response)
    }
}

export { ProfileUserInfoController }