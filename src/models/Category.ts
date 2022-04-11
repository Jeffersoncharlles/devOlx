import { model, Schema } from "mongoose";

interface ICategory {
    name: String;
    slug: String;
    createdAt: Number;
    updatedAt: Number;
}


const schema = new Schema<ICategory>(
    {
        name: String,
        slug: String,
        createdAt: Number,
        updatedAt: Number,
    }
)

const Category = model('Category', schema)

export { Category }