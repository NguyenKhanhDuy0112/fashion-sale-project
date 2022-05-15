import { combineReducers } from '@reduxjs/toolkit';
import orderAdSlice from './orderAd/orderAdSlice';
import toastSlice from './toast/toastSlice';
import toggleNavSlice from './toggleNav/toggleNavSlice';

const rootReducer = combineReducers({
    toggleNav: toggleNavSlice,
    orders: orderAdSlice,
    toast: toastSlice,
});

export default rootReducer