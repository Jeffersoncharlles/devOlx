
interface IUpdate {
    productId: string;
    userId: string;
    title?: string;
    price?: string;
    priceNegotiable?: boolean;
    description?: string;
    categoryId?: string;
    images?: {
        filename: string;
    }[]
}

class UpdateAdService {
    async execute({ productId, userId, title, price, priceNegotiable, description, categoryId, images }: IUpdate) {

    }
}

export { UpdateAdService }