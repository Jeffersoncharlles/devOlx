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
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

schema.virtual('img').get(function (this: {
    slug: string;
}) {
    return `${process.env.BASE ?? 'http://localhost:'}/public/assets/images/${this.slug}.png`;
})

const Category = model('Category', schema)

export { Category }