import { Product } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.products).then(res => res.data)
}

const listPagination = (page: number, limit: number) => {
    return api.get(`${api.url.products}?page=${page}&limit=${limit}`).then(res => res.data)
}

const get = (field: string) => {
    return api.get(api.url.products+'/search/?search='+field).then(res => res.data)
}

const findById = (id: string) => {
    return api.get(api.url.products+'/'+id).then(res => res.data)
}

const findBySlug = (slug: string) => {
    return api.get(api.url.products+'/slug/'+slug).then(res => res.data)
}

const remove = (id: string) => {
    return api.delete(api.url.products+'/'+id).then(res => res.data)
}

const update = (id:string ,data: Product) => {
    return api.put(api.url.products+'/'+id, data).then(res => res.data)
}

const add = (data: Product) => {
    return api.post(api.url.products, data).then(res => res.data)
}

const productsService = {
    list,
    get,
    delete: remove,
    update,
    findById,
    findBySlug,
    listPagination,
    add
}

export default productsService;