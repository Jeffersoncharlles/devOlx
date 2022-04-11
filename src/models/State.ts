import { model, Schema } from "mongoose";

interface IState {
    name: String;
    createdAt: Number;
    updatedAt: Number;
}

const schema = new Schema<IState>(
    {
        name: String,
        createdAt: Number,
        updatedAt: Number,
    }
)

const State = model('State', schema)

export { State }