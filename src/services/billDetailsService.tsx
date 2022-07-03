import { Bill, BillDetailApi, Category } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.billDetails).then(res => res.data)
}

const listPaginationExports = (page: number, limit: number) => {
    return api.get(`${api.url.billDetails}/type/exports?page=${page}&limit=${limit}`).then(res => res.data)
}

const listPaginationImports = (page: number, limit: number) => {
    return api.get(`${api.url.billDetails}/type/imports?page=${page}&limit=${limit}`).then(res => res.data)
}

const findBillImports = () => {
    return api.get(`${api.url.billDetails}/types/imports`).then(res => res.data)
}

const findBillExports = () => {
    return api.get(`${api.url.billDetails}/types/exports`).then(res => res.data)
}

const findById = (id: string) => {
    return api.get(`${api.url.billDetails}/${id}`).then(res => res.data)
}

const get = (field: string) => {
    return api.get(api.url.billDetails+'/search/?search='+field).then(res => res.data)
}

const remove = (id: string) => {
    return api.delete(api.url.billDetails+'/'+id).then(res => res.data)
}

const update = (id:string ,data: BillDetailApi) => {
    return api.put(api.url.billDetails+'/'+id, data).then(res => res.data)
}

const add = (data: BillDetailApi) => {
    return api.post(api.url.billDetails, data).then(res => res.data)
}

const billDetailsService = {
    list,
    get,
    delete: remove,
    findBillExports,
    findBillImports,
    findById,
    update,
    add,
    listPaginationExports,
    listPaginationImports,
}

export default billDetailsService;