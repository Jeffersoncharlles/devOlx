import { State } from "../../models/State"


class ListStateService {
    async execute() {
        const response = await State.find()
        return response
    }
}

export { ListStateService }