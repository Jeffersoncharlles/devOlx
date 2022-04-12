import { Request, Response } from "express";
import { OneListAdService } from "../../services/ad/OneListAdService";


class OneListAdController {
    async handle(req: Request, res: Response) {
        const ad = new OneListAdService()
        const { productId, other = true } = req.params as any;
        const response = await ad.execute({ productId, other })
        return res.json(response)
    }
}

export { OneListAdController }