export interface ProductOrder {
    id: string,
    name: string,
    price: number,
    quantity: number,
    amount: number,
}

export interface Order {
    id?: number
    title?: string,
    products: ProductOrder[],
}