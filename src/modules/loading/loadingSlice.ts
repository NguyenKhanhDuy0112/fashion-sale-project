import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   show: false
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.show = true
        },
        hideLoading: (state) => {
            state.show = false
        }
    },
});

export default loadingSlice.reducer;

export const { showLoading, hideLoading } = loadingSlice.actions;