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
        state: {
            type: Schema.Types.ObjectId,
            ref: 'State'
        }
    }
)

const User = model('User', schema)

export { User }