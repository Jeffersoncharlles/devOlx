import { NextFunction, Request, Response } from "express";

const errorsMiddlewares = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
        //se for uma instancia do tipo error
        return res.status(400).json({ error: error.message })
    }

    return res.status(500).json({
        status: 'error',
        message: "Internal server error."
    })
}

export { errorsMiddlewares }