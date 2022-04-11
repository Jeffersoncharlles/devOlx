import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../../models/User";

interface IAuth {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: IAuth) {

        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("User/Password not Authorization")
        }

        const passwordMatch = await compare(password, String(user.password))

        if (!passwordMatch) {
            throw new Error("User/Password not Authorization")
        }

        //gerar o token
        const token = sign({ name: user.name, email: user.email, },
            process.env.SECRET_JWT || '4f7443a30ae61227a21faa89ff167508', {
            subject: user.id,
            expiresIn: '7d'
        })

        const response = {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        }

        return response

    }
}

export { AuthUserService }