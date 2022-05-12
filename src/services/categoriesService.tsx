import { Category } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.categories).then(res => res.data)
}

const findById = (id: string) => {
    return api.get(`${api.url.categories}/${id}`).then(res => res.data)
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

const categoriesService = {
    list,
    get,
    delete: remove,
    findById,
    update,
    add
}

export default categoriesService;