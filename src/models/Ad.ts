import { model, Schema } from "mongoose";

const schema = new Schema(
    {
        name: String,
        title: String,
        userId: String,
        categoryId: String,
        price: Number,
        priceNegotiable: Boolean,
        description: String,
        views: Number,
        status: String,
        images: [Object],
        stateId: String,
        createdAt: Number,
        updatedAt: Number,
    }
)

const Ad = model('Ad', schema)

export { Ad }