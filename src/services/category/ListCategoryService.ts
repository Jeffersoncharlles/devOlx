import { Category } from "../../models/Category"


class ListCategoryService {
    async execute() {
        const categories = await Category.find()

        return categories
    }
}

export { ListCategoryService }