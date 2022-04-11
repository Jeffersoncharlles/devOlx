import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
    async handle(req: Request, res: Response) {
        const category = new ListCategoryService()
        const response = await category.execute()
        return res.json(response)
    }
}

export { ListCategoryController }