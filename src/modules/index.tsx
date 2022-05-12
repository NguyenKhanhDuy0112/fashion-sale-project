import { combineReducers } from '@reduxjs/toolkit';
import orderAdSlice from './orderAd/orderAdSlice';
import toggleNavSlice from './toggleNav/toggleNavSlice';

const rootReducer = combineReducers({
    toggleNav: toggleNavSlice,
    orders: orderAdSlice,
});

export default rootReducer