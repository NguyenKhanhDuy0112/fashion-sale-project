import { ProductDetail } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.productDetails).then(res => res.data)
}

const get = (field: string) => {
    return api.get(api.url.productDetails+'/search/?search='+field).then(res => res.data)
}

const findById = (id: string) => {
    return api.get(api.url.productDetails+'/'+id).then(res => res.data)
}

const remove = (id: string) => {
    return api.delete(api.url.productDetails+'/'+id).then(res => res.data)
}

const update = (data: ProductDetail[], id: string) => {
    return api.put(`${api.url.productDetails}/${id}`, data).then(res => res.data)
}

const add = (data: ProductDetail[]) => {
    return api.post(api.url.productDetails, data).then(res => res.data)
}

const productDetailsService = {
    list,
    get,
    delete: remove,
    update,
    findById,
    add
}

export default productDetailsService;