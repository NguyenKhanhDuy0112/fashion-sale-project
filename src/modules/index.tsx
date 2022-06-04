import { combineReducers } from '@reduxjs/toolkit';
import loadingSlice from './loading/loadingSlice';
import loginFormSlice from './loginForm/loginFormSlice';
import orderAdSlice from './orderAd/orderAdSlice';
import snackbarSlice from './snackbar/snackbarSlice';
import toastSlice from './toast/toastSlice';
import toggleNavSlice from './toggleNav/toggleNavSlice';

const rootReducer = combineReducers({
    toggleNav: toggleNavSlice,
    orders: orderAdSlice,
    toast: toastSlice,
    snackbar: snackbarSlice,
    loginForm: loginFormSlice,
    loading: loadingSlice
});

export default rootReducer