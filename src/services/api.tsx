import axios from 'axios';
import { authentication } from "../firebase-config"

const url = {
    baseUrl : process.env.REACT_App_API_URL,
    categories: '/categories',
    products: "/products",
    users : '/users',
    bills: "/bills",
    trademarks: "/trademarks",
    billDetails: "/bill-details",
    productDetails: "/product-details",
    coupons: "/coupons",
}

const instance = axios.create({
    baseURL : url.baseUrl,
    headers: {
        "Content-Type":"application/json",
        Accept:"application/json"
    }
})

const api = {
    url,
    instance,
    get:instance.get,
    put:instance.put,
    delete:instance.delete,
    post:instance.post
}

instance.interceptors.request.use(async (config:any) => {
    const currentUser = await authentication.currentUser
    if(currentUser){
        const token = await currentUser.getIdToken()
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// instance.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     if (error.response) {
//         window.location.href = '/no-internet';
//     }  else {
//         switch (error.response.status) {
//             case 401: window.location.href = '/login'; break;
//             case 403: window.location.href = '/no-permission'; break;
//             default : break
//         }
//     }
//     return Promise.reject(error);
// })


export default api;


