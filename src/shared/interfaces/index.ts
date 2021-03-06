export interface Product{
    _id: string, 
    name: string,
    material: string,
    origin: string,
    description: string,
    discount?: number,
    startDate?: any,
    endDate?:any, 
    unit: string,
    slug?: string,
    trademark?: any,
    price?: number,
    rating? : any,
    oneStar?: number,
    twoStar?: number,
    threeStar? : number,
    fourStar?:number,
    fiveStar?:number, 
    sold?: number,
    category?: any,
    createdAt?: any,
    updatedAt?: any,
    comments?: Comment[]
    productDetails?: ProductDetail[] | ProductDetailOrder[]
}

export interface Reply{
    _id?: string,
    content:string,
    createdAt?: Date,
    updatedAt?:Date,
    product: any,
    parent: string,
    user: any,
    images?: string[]
}

export interface Message{
    _id?:string,
    sender: string,
    text: string,
    conversationId: string,
    isSeen?: number,
    createdAt?:any,
    updatedAt?:any
}

export interface Conversation{
    _id?:string,
    members: User[]
}
export interface Comment{
    _id?:string,
    content:string,
    product: any,
    star: number,
    createdAt?: Date,
    updatedAt?:Date,
    user:any,
    children: Comment[],
    numberOfLikes?: number,
    liked?: number,
    images?: string[]
}

export interface ProductDetail{
    _id: string,
    quantity?: number,
    SKU?:string,
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
    _id?: string,
    id?: string,
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
    bills?: Bill,
    comments?: any,
    status?: any,
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
    statusDetails: {status: number, date: any}[]
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
    SKU? :string,
    quantity: number,
    product?: Product,
    size: string,
    color: string,
    images: string[]
}

export interface ProductCart extends ProductDetailOrder {
    isChecking: boolean,
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