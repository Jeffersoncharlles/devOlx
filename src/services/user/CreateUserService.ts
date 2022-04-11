import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { State } from "../../models/State";
import { User } from "../../models/User";
import { Types } from "mongoose";

interface ICreateUser {
    email: string;
    name: string;
    password: string;
    state: string
}

class CreateUserService {
    async execute({ email, name, password, state }: ICreateUser) {

        if (email && name && password && state) {

            const UserExists = await User.findOne({
                email
            })
            if (UserExists) {
                throw new Error("Invalid! User Already exists!")
            }

            try {
                const RegionExists = await State.findById(state)
                if (!RegionExists || !RegionExists.$isValid(state)) {
                    throw new Error("Invalid! Region not exists!")
                }
            } catch (error) {
                throw new Error("Invalid! Region not exists!")
            }

            const passwordHash = await hash(password, 8)
            //gerar o token


            const data = await User.create({
                email, name, stateId: state, password: passwordHash
            })

            const token = sign({ name: data.name, email: data.email, },
                process.env.SECRET_JWT || '4f7443a30ae61227a21faa89ff167508' as any, {
                subject: data.id,
                expiresIn: '7d'
            })

            const response = {
                id: data.id,
                name: data.name,
                email: data.email,
                state: data.stateId,
                token
            }

            return response


        }
        throw new Error("Invalid!")
    }
}

export { CreateUserService }