import { User } from "../shared/interfaces"
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

const findByPhoneNumber = (phoneNumber:string) => {
    return api.get(`${api.url.users}/phones/${phoneNumber}`).then(res => res.data)
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

const update = (id:string ,data: User) => {
    return api.put(`${api.url.users}/${id}`, data).then(res => res.data)
}

const add = (data: User) => {
    return api.post(api.url.users, data).then(res => res.data)
}

const findByUid = (uId:string) => {
    return api.get(`${api.url.users}/user/${uId}`).then(res => res.data) 
}

const findByEmail = (email: string) => {
    return api.get(`${api.url.users}/email/${email}`).then(res => res.data)
}

const loginByEmailAndPassword = ({email, password} : {email:string, password: string}) => {
    return api.post(`${api.url.users}/login`, {email, password}).then(res => res.data)
}

const usersService = {
    list,
    get,
    findById,
    delete: remove,
    findCustomers,
    findProviders,
    findByPhoneNumber,
    findByUid,
    update,
    add,
    listPaginationCustomers,
    listPaginationProviders,
    searchCustomers,
    searchProviders,
    findByEmail,
    loginByEmailAndPassword
}

export default usersService;