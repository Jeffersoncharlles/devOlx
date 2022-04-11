import { model, Schema } from "mongoose";

const schema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        token: String,
        stateId: String,
        createdAt: Number,
        updatedAt: Number,
    }
)

const User = model('User', schema)

export { User }