import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import loadingSlice from './loading/loadingSlice';
import loginFormSlice from './loginForm/loginFormSlice';
import orderAdSlice from './orderAd/orderAdSlice';
import snackbarSlice from './snackbar/snackbarSlice';
import toastSlice from './toast/toastSlice';
import toggleNavSlice from './toggleNav/toggleNavSlice';
import userSlice from "./user/useSlice";
import notifyCart from "./notifyCart/notifyCartSlice";

const rootReducer = combineReducers({
    toggleNav: toggleNavSlice,
    orders: orderAdSlice,
    toast: toastSlice,
    snackbar: snackbarSlice,
    loginForm: loginFormSlice,
    loading: loadingSlice,
    user: userSlice,
    cart: cartSlice,
    notifyCart: notifyCart
});

export default rootReducer