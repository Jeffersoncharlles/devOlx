import { NextFunction, Request, Response } from "express"
import { verify } from 'jsonwebtoken';


interface IPayload {
    sub: string;
}


const ensureAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.SECRET_JWT || '4f7443a30ae61227a21faa89ff167508'
    // Receber o token
    const authToken = req.headers.authorization
    if (!authToken) {
        return res.status(401).end();

    }
    const [, token] = authToken.split(' ')
    try {
        //validar o token
        const { sub } = verify(token, secret) as IPayload
        req.user_id = sub;
        return next()

    } catch (error) {
        return res.status(401).end()
    }
}

export { ensureAuthenticate }