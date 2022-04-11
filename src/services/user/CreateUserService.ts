import { hash } from "bcryptjs";
import { State } from "../../models/State";
import { User } from "../../models/User";

interface ICreateUser {
    email: string;
    name: string;
    password: string;
    state: string
}

class CreateUserService {
    async execute({ email, name, password, state }: ICreateUser) {

        const UserExists = await User.findOne({
            email
        })

        const RegionExists = await State.findById({ state })

        if (UserExists) {
            return { message: "Invalid! User Already exists!" }
        }
        if (!RegionExists) {
            return { message: "Invalid! Region not exists!" }
        }

        const passwordHash = await hash(password, 8)

        const response = await User.create({
            email, name, state, password: passwordHash
        })

        return response
    }
}

export { CreateUserService }