import { Trademark } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.trademarks).then(res => res.data)
}

const listPagination = (page: number, limit: number) => {
    return api.get(`${api.url.trademarks}?page=${page}&limit=${limit}`).then(res => res.data)
}

const findById = (id: string) => {
    return api.get(`${api.url.trademarks}/${id}`).then(res => res.data)
}

const get = (field: string) => {
    return api.get(api.url.trademarks+'/search/?search='+field).then(res => res.data)
}

const remove = (id: string) => {
    return api.delete(api.url.trademarks+'/'+id).then(res => res.data)
}

const update = (id:string ,data: Trademark) => {
    return api.put(api.url.trademarks+'/'+id, data).then(res => res.data)
}

const search = (value: string, page:number, limit: number) => {
    return api.get(`${api.url.trademarks}/find?q=${value}&page=${page}&limit=${limit}`).then(res => res.data)
}

const add = (data: Trademark) => {
    return api.post(api.url.trademarks, data).then(res => res.data)
}

const trademarksService = {
    list,
    get,
    delete: remove,
    listPagination,
    findById,
    search,
    update,
    add
}

export default trademarksService;