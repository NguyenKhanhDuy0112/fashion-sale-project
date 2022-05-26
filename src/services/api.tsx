import axios from 'axios';

const url = {
    baseUrl : "https://fashion-sales-management.herokuapp.com/api",
    categories: '/categories',
    products: "/products",
    users : '/users',
    bills: "/bills",
    trademarks: "/trademarks",
    billDetail: "/bill-detail",
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


