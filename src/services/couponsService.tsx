import { Coupon } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.coupons).then(res => res.data)
}

const listPagination = (page: number, limit: number) => {
    return api.get(`${api.url.coupons}?page=${page}&limit=${limit}`).then(res => res.data)
}

const findById = (id: string) => {
    return api.get(`${api.url.coupons}/${id}`).then(res => res.data)
}

const get = (field: string) => {
    return api.get(api.url.coupons+'/search/?search='+field).then(res => res.data)
}

const remove = (id: string) => {
    return api.delete(api.url.coupons+'/'+id).then(res => res.data)
}

const update = (id:string ,data: Coupon) => {
    return api.put(api.url.coupons+'/'+id, data).then(res => res.data)
}

const add = (data: Coupon) => {
    return api.post(api.url.coupons, data).then(res => res.data)
}

const couponsService = {
    list,
    get,
    delete: remove,
    listPagination,
    findById,
    update,
    add
}

export default couponsService;