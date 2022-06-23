import { Bill, BillApi } from "../shared/interfaces"
import api from "./api"

const list = () => {
    return api.get(api.url.bills).then(res => res.data)
}

const listPaginationExports = (page: number, limit: number) => {
    return api.get(`${api.url.bills}/type/exports?page=${page}&limit=${limit}`).then(res => res.data)
}

const listPaginationImports = (page: number, limit: number) => {
    return api.get(`${api.url.bills}/type/imports?page=${page}&limit=${limit}`).then(res => res.data)
}

const findBillImports = () => {
    return api.get(`${api.url.bills}/type/imports`).then(res => res.data)
}

const findBillExports = () => {
    return api.get(`${api.url.bills}/type/exports`).then(res => res.data)
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

const update = (id:string ,data: Bill) => {
    return api.put(api.url.bills+'/'+id, data).then(res => res.data)
}

const add = (data: BillApi) => {
    return api.post(api.url.bills, data).then(res => res.data)
}

const getStatistical = () => {
    return api.get(`${api.url.bills}/statistics`).then(res => res.data)
}

const getStatisticalRevenueDay = () => {
    return api.get(`${api.url.bills}/revenue-daily`).then(res => res.data) 
}

const findAllByUser = (id: string) => {
    console.log(`${api.url.bills}/find-all-by-user/${id}`)
    return api.get(`${api.url.bills}/find-all-by-user/${id}`).then(res => res.data)
}

const findByStatusUser = (id: string,status: number) => {
    return api.get(`${api.url.bills}/find-by-status-user/${id}?status=${status}`).then(res => res.data)
}

const getBillDetailsByBillId = (id: string) =>{
    return api.get(`${api.url.bills}/${id}/bill-detail`).then(res => res.data)
}

const billsService = {
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
    getStatistical,
    getStatisticalRevenueDay,
    findAllByUser,
    findByStatusUser,
    getBillDetailsByBillId,
}

export default billsService;