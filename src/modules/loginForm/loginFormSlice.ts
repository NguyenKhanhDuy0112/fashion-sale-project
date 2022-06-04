import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   show: false
};

const formLogin = createSlice({
    name: 'showFormLogin',
    initialState,
    reducers: {
        toggleFormLogin: (state) => {
            const show = state.show
            state.show = !show
        },
        showLogin: (state) => {
            state.show = true
        },
        hideLogin: (state) => {
            state.show = false
        }
       
    },
});

export default formLogin.reducer;

export const { toggleFormLogin, showLogin, hideLogin } = formLogin.actions;