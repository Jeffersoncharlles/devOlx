import { Request, Response } from "express";
import { ListStateService } from "../../services/state/ListStateService";

class ListStateController {
    async handle(req: Request, res: Response) {
        const state = new ListStateService();
        const response = await state.execute()
        return res.json(response)
    }
}

export { ListStateController }