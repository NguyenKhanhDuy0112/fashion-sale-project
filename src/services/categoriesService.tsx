import { Category } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.categories).then(res => res.data)
}

const listPagination = (page: number, limit: number) => {
    return api.get(`${api.url.categories}?page=${page}&limit=${limit}`).then(res => res.data)
}

const search = (value: string, page:number, limit: number) => {
    return api.get(`${api.url.categories}/find?q=${value}&page=${page}&limit=${limit}`).then(res => res.data)
}

const findById = (id: string) => {
    return api.get(`${api.url.categories}/${id}`).then(res => res.data)
}

const findBySlug = (slug:string) => {
    return api.get(`${api.url.categories}/search?slug=${slug}`).then(res => res.data)
}

const get = (field: string) => {
    return api.get(api.url.categories+'/search/?search='+field).then(res => res.data)
}

const remove = (id: string) => {
    return api.delete(api.url.categories+'/'+id).then(res => res.data)
}

const update = (id:string ,data: Category) => {
    return api.put(api.url.categories+'/'+id, data).then(res => res.data)
}

const add = (data: Category) => {
    return api.post(api.url.categories, data).then(res => res.data)
}

const getProductsByCategoryId = (id: string, page: number, limit: number) => {
    return api.get(`${api.url.categories}/${id}/products?page=${page}&limit=${limit}`).then(res => res.data)
}

const categoriesService = {
    list,
    get,
    delete: remove,
    findBySlug,
    listPagination,
    search,
    findById,
    update,
    add,
    getProductsByCategoryId
}

export default categoriesService;