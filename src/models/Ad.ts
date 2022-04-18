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
        },
        createdAt: Number,
        updatedAt: Number,
    }, {
    toJSON: {
        virtuals: true
    }
}
)
schema.virtual('imagesUrl').get(function (this: {
    images: [{
        url: string;
    }]
}) {
    return this.images.map((item) => {
        const data = {
            original: `${process.env.BASE ?? 'http://localhost:'}/public/${item.url}`, thumbnail: `${process.env.BASE ?? 'http://localhost:'}/public/${item.url}`
        }
        return data;
    })

})


const Ad = model('Ad', schema)

export { Ad }