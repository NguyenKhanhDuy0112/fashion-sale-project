export interface Product{
    _id: string, 
    name: string,
    material: string,
    origin: string,
    description: string,
    unit: string,
    slug?: string,
    price?: number,
    rating? : number,
    category?: any,
    productDetails?: ProductDetail[]
}

export interface ProductDetail{
    _id: string,
    quantity?: number,
    status?: number,
    product?: Product,
    size: any,
    color: any,
    images?: any
}

export interface Category{
    _id: any,
    name: string,
    image: any,
    slug?: string,
    products? : Product
}

export interface User{
    _id: string,
    name: string,
    phone: string,
    email: string,
    isCustomer?: 0 | 1,
    isAdmin?: 0 | 1,
    isProvider?: 0 | 1,
    avatar: any,
    createdAt?: Date,
    updatedAt?: Date,
    address: string,
    password: string,
    numberBankAccount?: string,
    bill?: any,
    comments?: any
}

export interface Bill{
    _id: string,
    createdAt?: Date,
    shippedDate?: Date,
    updatedAt?: Date,
    status: number,
    user?: User,
    coupon?: Coupon,
    date? :Date,
    type: string,
    billDetails?: BillDetail[]
}

export interface BillDetail{
    _id: string,
    quantity: number,
    price: number,
    discount?: number,
    productDetail: ProductDetail,
    bill: Bill,
}

export interface Coupon{
    _id: string,
    code: string,
    percent: number,
    dateStart?: Date,
    dateEnd?: Date,
    minimumAmount: number,
    isActive: false | true,
    bill? :Bill
}

export interface Pagination {
    totalDocs: number,
    limit: number,
    totalPages: number,
    page: number,
    pagingCounter: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number,
    nextPage :number,

}