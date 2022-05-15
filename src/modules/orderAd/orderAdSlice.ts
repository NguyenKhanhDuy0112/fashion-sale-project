import { Order } from './orderInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Orders {
    orders: Order[]
}

const initialState: Orders = {
    orders: [
        {
            id: 1,
            title: 'Đặt hàng 1',
            products: []
        },
    ]
};

const orderAd = createSlice({
    name: 'orderAdmin',
    initialState,
    reducers: {
        createNewOrder: (state) => {
            const lastOrder = state.orders[state.orders.length - 1]
            const numberOrder = lastOrder.id && lastOrder.id + 1
            
            const order = {
                id: numberOrder,
                title: `Đặt hàng ${numberOrder}`,
                products: []
            }
            state.orders.push(order)
        },

        deleteOrder: (state, action: PayloadAction<number>) => {
            if(state.orders.length > 1){
                state.orders.splice(action.payload, 1)
            }
        },

        updateOrder: (state, action) => {
            const order = state.orders.find((item, index) => index === action.payload.position)
            if(order){
                order.products.push(action.payload.product)
                state.orders.splice(action.payload.position, 1, order)
            }
        }
    },
});

export default orderAd.reducer;

export const { createNewOrder, deleteOrder, updateOrder } = orderAd.actions;