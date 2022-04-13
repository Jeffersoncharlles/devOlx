import { Request, Response } from "express";
import { UpdateAdService } from "../../services/ad/UpdateAdService";


class UpdateAdController {
    async handle(req: Request, res: Response) {
        const ad = new UpdateAdService()
        const { productId } = req.params
        const { categoryId, description, price, priceNegotiable, title, status } = req.body
        const userId = req.user_id
        const images = req.files as any
        const response = await ad.execute({ productId, userId, categoryId, description, images, price, priceNegotiable, title, status })
        return res.json(response)

    }
}

export { UpdateAdController }