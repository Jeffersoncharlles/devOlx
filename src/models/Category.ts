import { model, Schema } from "mongoose";

const schema = new Schema(
    {
        name: String,
        slug: String,
        createdAt: Number,
        updatedAt: Number,
    }
)

const Category = model('Category', schema)

export { Category }