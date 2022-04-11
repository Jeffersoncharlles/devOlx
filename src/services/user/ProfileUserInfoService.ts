import { Ad } from "../../models/Ad"
import { Category } from "../../models/Category"
import { State } from "../../models/State"
import { User } from "../../models/User"


interface IMe {
    id: string
}

class ProfileUserInfoService {
    async execute({ id }: IMe) {

        const user = await User.findOne({ _id: id })
        if (!user) {
            throw new Error("invalid!User Already exists")
        }

        const state = await State.findById({ _id: user?.stateId })
        const ads = await Ad.find({ userId: user?._id.toString() }).populate('stateId').exec()

        let adList = [] as any
        // for (let i in ads) {

        //     const category = await Category.findById(ads[i].categoryId)

        //     adList.push({
        //         id: ads[i]._id,
        //         status: ads[i].status,
        //         images: ads[i].images,
        //         title: ads[i].title,
        //         price: ads[i].price,
        //         priceNegotiable: ads[i].priceNegotiable,
        //         description: ads[i].description,
        //         views: ads[i].views,
        //         category: category?.slug
        //     })
        //  adList.push({...ads[i],category:category?.slug})
        // }

        const response = {
            id: user.id,
            name: user.name,
            email: user.email,
            region: state?.name,
            ads: ads
        }

        return response

    }
}

export { ProfileUserInfoService }