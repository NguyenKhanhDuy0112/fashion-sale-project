import { Category } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.bills).then(res => res.data)
}

const findBillImports = () => {
    return api.get(`${api.url.bills}/types/imports`).then(res => res.data)
}

const findBillExports = () => {
    return api.get(`${api.url.bills}/types/exports`).then(res => res.data)
}

const findById = (id: string) => {
    return api.get(`${api.url.bills}/${id}`).then(res => res.data)
}

const get = (field: string) => {
    return api.get(api.url.bills+'/search/?search='+field).then(res => res.data)
}

const remove = (id: string) => {
    return api.delete(api.url.bills+'/'+id).then(res => res.data)
}

const update = (id:string ,data: Category) => {
    return api.put(api.url.bills+'/'+id, data).then(res => res.data)
}

const add = (data: Category) => {
    return api.post(api.url.bills, data).then(res => res.data)
}

const billsService = {
    list,
    get,
    delete: remove,
    findBillExports,
    findBillImports,
    findById,
    update,
    add
}

export default billsService;