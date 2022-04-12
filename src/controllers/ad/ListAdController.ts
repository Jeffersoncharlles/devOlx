import { Request, Response } from "express";
import { ListAdService } from "../../services/ad/ListAdService";

class ListAdController {
    async handle(req: Request, res: Response) {
        const ad = new ListAdService()
        const { sort = 'asc', offset = 0, limit = 8, q, cat, region } = req.query as any
        const response = await ad.execute({ sort, offset, limit, q, cat, region })
        return res.json(response)
    }
}

export { ListAdController }