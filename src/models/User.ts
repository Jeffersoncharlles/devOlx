import { model, Schema, Types } from "mongoose";

interface IUser {
    name: String;
    email: String;
    password: String;
    createdAt: Number;
    updatedAt: Number;
    stateId: Types.ObjectId;
}


const schema = new Schema<IUser>(
    {
        name: String,
        email: String,
        password: String,
        createdAt: Number,
        updatedAt: Number,
        stateId: {
            type: Schema.Types.ObjectId,
            ref: 'State'
        }
    }
)

const User = model('User', schema)

export { User }