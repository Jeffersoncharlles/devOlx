import { Ad } from "../../models/Ad";
import { Category } from "../../models/Category";
import { User } from "../../models/User";

interface IUpdate {
    productId: string;
    userId: string;
    title?: string;
    price?: string;
    status?: boolean
    priceNegotiable?: boolean;
    description?: string;
    categoryId?: string;
    images?: {
        filename: string;
    }[]
}

interface IUpdates {
    title?: string;
    status?: boolean;
    price?: number;
    priceNegotiable?: boolean;
    description?: string;
    categoryId?: string;
    images?: {
        filename: string;
    }[]
}

class UpdateAdService {
    async execute({ productId, userId, title, price, priceNegotiable, description, categoryId, images, status }: IUpdate) {

        if (productId.length < 24) {
            throw new Error("invalid! ID")
        }
        const ad = await Ad.findById(productId).exec()
        if (!ad) {
            throw new Error("invalid! Not found product")
        }
        if (String(userId) !== String(ad.userId)) {
            throw new Error("invalid! not ads user")
        }

        let updates: IUpdates = {}
        if (title) {
            updates.title = title
        }
        if (price) {
            // R$ 8.000,24 = 8000.35
            const Formatted = price
                .replace('.', '')
                .replace(',', '.')
                .replace('R$ ', '')
            updates.price = parseFloat(Formatted)
        }
        if (priceNegotiable) {
            updates.priceNegotiable = priceNegotiable
        }
        if (status) {
            updates.status = status
        }
        if (description) {
            updates.description = description
        }
        if (categoryId) {
            const category = await Category.findOne({ _id: categoryId })
            if (!category) {
                throw new Error("invalid! not found category")
            }
            updates.categoryId = categoryId
        }

        if (images) {
            updates.images = images?.map(item => {
                //criando objeto com url e default
                //para cada item
                const resp = Object.assign({
                    url: item.filename, default: false
                })
                return resp
            })
        }

        await Ad.findByIdAndUpdate(productId, { $set: updates })

        //new images


        console.log(updates)
    }
}

export { UpdateAdService }