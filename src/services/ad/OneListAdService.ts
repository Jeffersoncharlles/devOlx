import { Ad } from "../../models/Ad";

interface IOneList {
    productId: string;
    other?: boolean;
}

interface IResponse {
    id: string;
    title: string;
    price: number;
    priceNegotiable: boolean,
    description: string;
    views: number;
    createdAt: number;
    updatedAt: number;
    images: string[];
    category: {
        _id: string;
        name: string;
        slug: string;
        img: string;
    }
    user: {
        name: string;
        email: string;
    }
}


class OneListAdService {
    async execute({ productId, other }: IOneList) {
        if (productId.length < 24) {
            throw new Error("invalid! ID")
        }
        try {
            const data = await Ad.findOne({ _id: productId })
                .populate({ path: 'categoryId', select: 'slug name' })
                .populate('stateId', 'name')
                .populate({ path: 'userId', select: 'email name' })
                .exec()
            if (!data) {
                throw new Error("invalid!not found product")
            }

            await Ad.updateOne({ views: Number(data.views) + 1 })

            let otherDatas
            if (other) {
                let otherData = await Ad.find({ status: true, userId: data.userId }).exec()
                otherDatas = otherData.map((item, index) => {
                    if (String(item._id) !== String(data._id)) {
                        const response = Object.assign({
                            id: item._id,
                            title: item.title,
                            price: item.price,
                            image: item.images
                        })
                        return response
                    }
                })
            }


            return {
                data,
                otherDatas
            }

        } catch (error) {
            throw new Error("invalid!")
        }
    }
}

export { OneListAdService }