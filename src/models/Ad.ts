import { model, Schema, Types } from "mongoose";

interface IAd {
    name: String;
    title: String;
    price: Number;
    priceNegotiable: Boolean;
    description: String;
    views: Number;
    status: String;
    images: { url: string, status: boolean }[];
    createdAt: Number;
    updatedAt: Number;
    state: Types.ObjectId;
    user: Types.ObjectId;
    category: Types.ObjectId;
}


const schema = new Schema<IAd>(
    {
        name: String,
        title: String,
        price: Number,
        priceNegotiable: Boolean,
        description: String,
        views: Number,
        status: String,
        images: [Object],
        createdAt: Number,
        updatedAt: Number,
        state: {
            type: Schema.Types.ObjectId,
            ref: 'State'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    }
)

const Ad = model('Ad', schema)

export { Ad }