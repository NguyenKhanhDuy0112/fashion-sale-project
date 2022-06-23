import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartNotify {
    show: boolean,
    delay?: number,
}

const initialState: CartNotify = {
    show: false,
    delay: 1000
};

const CartNotifySlice = createSlice({
    name: 'notifyCart',
    initialState,
    reducers: {
        showCartNotify: (state, action: PayloadAction<CartNotify>) => {
            state.show = true
            state.delay = action.payload.delay
        },
        hideCartNotify: (state) => {
            state.show = false
        }
    },
});

export default CartNotifySlice.reducer;

export const { showCartNotify, hideCartNotify } = CartNotifySlice.actions;