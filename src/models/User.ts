import { model, Schema, Types } from "mongoose";

interface IUser {
    name: String;
    email: String;
    password: String;
    token: String;
    stateId: String;
    createdAt: Number;
    updatedAt: Number;
    state: Types.ObjectId;
}


const schema = new Schema<IUser>(
    {
        name: String,
        email: String,
        password: String,
        token: String,
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