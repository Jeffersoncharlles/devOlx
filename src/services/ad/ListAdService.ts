import { Ad } from "../../models/Ad";
import { Category } from "../../models/Category";
import { State } from "../../models/State";

interface IListAd {
    sort?: string;
    offset?: string | number | undefined;
    limit?: number;
    q?: string;
    cat?: string;
    region?: string
}

interface IResponse {
    id: String;
    title: String;
    price: number
    priceNegotiable: boolean
    image: string
}

interface IFilter {
    status: true,
    title: {
        regex: string;
        options: string;
    }
}

class ListAdService {
    async execute({ sort, offset, limit, q, cat, region }: IListAd) {

        let filter = { status: true }
        if (q) {
            filter = Object.assign({
                title: { '$regex': q, '$options': 'i' }
            })
        }
        if (cat) {
            const categoriesSlugs = await Category.findOne({ slug: cat })
            if (categoriesSlugs) {
                filter = Object.assign({
                    category: categoriesSlugs._id.toString()
                })
            }
        }
        if (region) {
            const regionExists = await State.findOne({ name: region.toUpperCase() })
            if (regionExists) {
                filter = Object.assign({
                    stateId: regionExists._id.toString()
                })
            }
        }
        // console.log(filter)
        const finds = await Ad.find(filter).exec()
        const totalAds = finds.length

        const data = await Ad.find(filter)
            .sort({ createdAt: (sort === 'desc' ? -1 : 1) })
            .skip(parseInt(String(offset)))
            .limit(parseInt(String(limit)))
            .exec()
        const adsFormatted: IResponse[] = data.map((item) => {

            // let defaultImg = ''
            // const img = item.images.find(e => e.status === true)
            // if (img) {
            //     defaultImg = `${process.env.BASE ?? 'http://localhost:'}${process.env.PORT ?? '2052'}/public/${img.url}`
            // } else {
            //     defaultImg = `${process.env.BASE ?? 'http://localhost:'}${process.env.PORT ?? '2052'}/public/default.jpg`
            // }

            return Object.assign({
                id: item._id,
                title: item.title,
                price: item.price,
                priceNegotiable: item.priceNegotiable,
                image: item.images[0].status ? `${process.env.BASE ?? 'http://localhost:'}/public/default.jpg` : `${process.env.BASE ?? 'http://localhost:'}/public/${item.images[0].url}`
            })
        })

        return {
            adsFormatted,
            totalAds
        }
    }
}

export { ListAdService }