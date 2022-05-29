import { Product } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.users).then(res => res.data)
}

const findCustomers = () => {
    return api.get(`${api.url.users}/v1/customers`).then(res => res.data)
}

const searchCustomers = (value: string, page:number, limit: number) => {
    return api.get(`${api.url.users}/find?q=${value}&auth=customer&page=${page}&limit=${limit}`).then(res => res.data)
}

const searchProviders = (value: string, page:number, limit: number) => {
    return api.get(`${api.url.users}/find?q=${value}&auth=provider&page=${page}&limit=${limit}`).then(res => res.data)
}

const listPaginationCustomers = (page: number, limit: number) => {
    return api.get(`${api.url.users}/v1/customers?page=${page}&limit=${limit}`).then(res => res.data)
}

const listPaginationProviders = (page: number, limit: number) => {
    return api.get(`${api.url.users}/v1/providers?page=${page}&limit=${limit}`).then(res => res.data)
}

const findProviders = () => {
    return api.get(`${api.url.users}/v1/providers`).then(res => res.data)
}

const findById = (id: string) => {
    return api.get(`${api.url.users}/${id}`).then(res => res.data)
}

const get = (field: string) => {
    return api.get(`${api.url.users}/search?search=${field}`).then(res => res.data)
}

const remove = (id: string) => {
    return api.delete(`${api.url.users}/${id}`).then(res => res.data)
}

const update = (id:string ,data: Product) => {
    return api.put(`${api.url.users}/${id}`, data).then(res => res.data)
}

const add = (data: Product) => {
    return api.post(api.url.users, data).then(res => res.data)
}

const usersService = {
    list,
    get,
    findById,
    delete: remove,
    findCustomers,
    findProviders,
    update,
    add,
    listPaginationCustomers,
    listPaginationProviders,
    searchCustomers,
    searchProviders
}

export default usersService;