import { ProductCart } from '../../shared/interfaces/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cart {
    products: ProductCart[],
    productsChecking: ProductCart[],
}

const initialState: Cart = {
    products: [],
    productsChecking: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getProducts: (state, action: PayloadAction<{ key: string }>) => {
            let products = []
            if (localStorage.getItem(action.payload.key)) {
                products = JSON.parse(localStorage.getItem(action.payload.key) || "")
            }
            else {
                localStorage.setItem(action.payload.key, JSON.stringify([]))
            }
            state.products = products
        },
        getProductsChecking: (state) => {
            const products = state.products.filter(pro => pro.isChecking === true)
            state.productsChecking = products
        },
        addProduct: (state, action: PayloadAction<{ key: string, product: ProductCart }>) => {
            if (localStorage.getItem(action.payload.key)) {
                const products: ProductCart[] = state.products
                const findIndex = products.findIndex(pro => pro.color === action.payload.product.color && pro.size === action.payload.product.size && pro.product?._id == action.payload.product.product?._id)
                const product = products.find(pro => pro.color === action.payload.product.color && pro.size === action.payload.product.size && pro.product?._id == action.payload.product.product?._id)
                if (product) {
                    products.splice(findIndex, 1, { ...action.payload.product, quantity: product.quantity + action.payload.product.quantity })
                }
                else {
                    products.push(action.payload.product)
                }

                localStorage.setItem(action.payload.key, JSON.stringify(products))
                state.products = products
            }
        },
        deleteProducts: (state, action: PayloadAction<{ key: string, index: number }>) => {
            if (localStorage.getItem(action.payload.key)) {
                const products = state.products
                products.splice(action.payload.index, 1)
                localStorage.setItem(action.payload.key, JSON.stringify(products))
                state.products = products
            }
        },

        deleteProductsByChecking: (state, action: PayloadAction<{ key: string }>) => {
            if (localStorage.getItem(action.payload.key)) {
                const products = state.products.filter(pro => !pro.isChecking)
                localStorage.setItem(action.payload.key, JSON.stringify(products))
                state.products = products
                state.productsChecking = []
            }
        },

        updateProduct: (state, action: PayloadAction<{ key: string, product: ProductCart }>) => {
            if (localStorage.getItem(action.payload.key)) {
                const findIndex = state.products.findIndex(pro => pro._id === action.payload.product._id)
                const products = state.products
                products.splice(findIndex, 1, action.payload.product)
                const productChecking = products.filter(pro => pro.isChecking)
                localStorage.setItem(action.payload.key, JSON.stringify(products))
                state.products = products
                state.productsChecking = productChecking
            }
        },
        toggleCheckAll: (state, action: PayloadAction<{ key: string, checking: boolean }>) => {
            const products = state.products.map(pro => ({ ...pro, isChecking: action.payload.checking }))
            state.products = products
            if (localStorage.getItem(action.payload.key)) {
                localStorage.setItem(action.payload.key, JSON.stringify(products))
            }
            if (action.payload) {
                state.productsChecking = products
            } else {
                state.productsChecking = []
            }

        },
        resetCart: (state) => {
            state.products = []
            state.productsChecking = []
        }
    },
});

export default cartSlice.reducer;

export const { 
    getProducts, 
    getProductsChecking, 
    deleteProducts, 
    addProduct, 
    resetCart, 
    updateProduct, 
    toggleCheckAll, 
    deleteProductsByChecking 
} = cartSlice.actions;