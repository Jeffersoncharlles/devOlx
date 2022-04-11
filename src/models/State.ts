import { model, Schema } from "mongoose";

const schema = new Schema(
    {
        name: String,
        createdAt: Number,
        updatedAt: Number,
    }
)

const State = model('State', schema)

export { State }