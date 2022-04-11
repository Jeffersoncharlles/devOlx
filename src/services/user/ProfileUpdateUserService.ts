import { hash } from "bcryptjs";
import { State } from "../../models/State";
import { User } from "../../models/User";


interface IProfileUpdate {
    id: string;
    name?: string;
    email?: string;
    state?: string;
    password?: string;
}

class ProfileUpdateUserService {
    async execute({ id, name, email, state, password }: IProfileUpdate) {
        if (id) {
            const userExists = await User.findOne({ _id: id })
            if (!userExists) {
                throw new Error("invalid!User Already exists")
            }

            if (email) {
                const EmailExists = await User.findOne({ email })
                if (String(EmailExists?.email) !== String(userExists.email)) {
                    throw new Error("invalid!Email Already exists")
                }
            }
            if (state) {
                try {
                    const stateExists = await State.findOne({ _id: state })
                    if (!stateExists?.name) {
                        throw new Error("invalid!Region not exists")
                    }
                }
                catch (error) {
                    throw new Error("invalid!Region not exists")
                }
            }

            const response = await User.updateOne({ _id: id }, {
                name, email, stateId: state
            })

            return response
        }

    }
}

export { ProfileUpdateUserService }