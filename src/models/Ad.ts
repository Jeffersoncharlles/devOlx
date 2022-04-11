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
    stateId: Types.ObjectId;
    userId: Types.ObjectId;
    categoryId: Types.ObjectId;
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
        stateId: {
            type: Schema.Types.ObjectId,
            ref: 'State'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    }
)

const Ad = model('Ad', schema)

export { Ad }