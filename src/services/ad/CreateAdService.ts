import { Ad } from "../../models/Ad"
import { User } from "../../models/User"

interface ICreateAd {
    userId: string;
    title: string;
    price: string;
    priceNegotiable: boolean;
    description: string;
    categoryId: string;
    images?: {
        filename: string;
    }[]
}


class CreateAdService {
    async execute({ userId, title, price, priceNegotiable, description, categoryId, images }: ICreateAd) {

        if (!title || !categoryId) {
            throw new Error("Invalid! Params not sent")
        }
        const user = await User.findOne({ _id: userId })
        if (!user) {
            throw new Error("Invalid! User already exists")
        }

        let priceFormatted = 0
        if (price) {
            // R$ 8.000,24 = 8000.35
            const Formatted = price
                .replace('.', '')
                .replace(',', '.')
                .replace('R$ ', '')
            priceFormatted = parseFloat(Formatted)
        }

        let newImage: any = images?.map(item => {
            //criando objeto com url e default
            //para cada item
            let resp = Object.assign({
                url: item.filename, default: false
            })
            return resp
        })
        if (newImage?.length > 0) {
            //se o array tiver maior que 1 ele ja muda o primeiro para true
            newImage[0].default = true;
        }

        const response = await Ad.create({
            status: true,
            categoryId,
            userId,
            stateId: user.stateId,
            description,
            price: priceFormatted,
            priceNegotiable,
            views: 0,
            images: newImage,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        return response

    }
}

export { CreateAdService }