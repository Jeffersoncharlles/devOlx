import { Request, Response } from "express";
import { CreateAdService } from "../../services/ad/CreateAdService";


class CreateAdController {
    async handle(req: Request, res: Response) {
        const ad = new CreateAdService()
        const { title, price, priceNegotiable, description, categoryId } = req.body
        const userId = req.user_id
        if (!req.files) {
            throw new Error("error upload file")
        } else {
            const images = req.files as any
            const response = await ad.execute({ userId, title, price, priceNegotiable, description, categoryId, images })
            return res.json(response)
        }


    }
}

export { CreateAdController }