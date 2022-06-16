import api from "./api"

const getProvince = () => {
    return api.get(api.url.location).then(res => res.data)
}

const getDistrict = (province:string) => {
    return api.get(`${api.url.location}?province=${province}`).then(res => res.data)
}

const getVilage = (province:string, district: string) => {
    return api.get(`${api.url.location}?province=${province}&district=${district}`).then(res => res.data)
}

const addressService = {
    getProvince,
    getDistrict,
    getVilage
}

export default addressService;