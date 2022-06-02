export interface Product{
    _id: string, 
    name: string,
    material: string,
    origin: string,
    description: string,
    unit: string,
    slug?: string,
    trademark?: any,
    price?: number,
    rating? : number,
    category?: any,
    createdAt?: any,
    updatedAt?: any,
    productDetails?: ProductDetail[]
}

export interface ProductDetail{
    _id: string,
    quantity?: number,
    sku?:string,
    status?: number,
    product?: Product,
    sizes: any,
    color: any,
    images?: any
}

export interface Trademark{
    _id: any,
    name: string,
    image: any,
    products? : Product[]
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
    _id?: string,
    createdAt?: Date,
    shippedDate?: any,
    updatedAt?: Date,
    status: number,
    user?: User,
    feeShip?: number,
    coupon?: Coupon,
    totalPrice: number,
    method?: string,
    date? :any,
    type?: string,
    billDetails?: BillDetail[]
}

export interface BillApi{
    _id?: string,
    createdAt?: Date,
    shippedDate?: any,
    feeShip: number,
    updatedAt?: Date,
    status: number,
    user?: string,
    coupon?: Coupon,
    date? :any,
    type?: string,
    billDetails?: BillDetail[]
}

export interface BillDetail{
    _id?: string,
    quantity: number,
    price?: number,
    discount?: number,
    productDetail: ProductDetailOrder,
    bill: Bill,
}

export interface BillDetailApi{
    _id?: string,
    quantity: number,
    price?: number,
    discount?: number,
    productDetail: string,
    bill: string,
}

export interface Coupon{
    _id?: string,
    code: string,
    discount: number,
    dateStart: any,
    dateEnd: any,
    minimumAmount: number,
    isActive: boolean,
    bill? :Bill
}

export interface ProductDetailOrder{
    _id: string,
    quantity: number,
    product?: Product,
    size: string,
    color: string,
    images: string[]
}

export interface ProductOrder {
    _id: string,
    name: string,
    material: string,
    origin: string,
    description: string,
    unit: string,
    slug?: string,
    trademark?: any,
    price?: number,
    rating?: number,
    category?: any,
    createdAt?: any,
    updatedAt?: any,
    productDetails: ProductDetailOrder[],
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