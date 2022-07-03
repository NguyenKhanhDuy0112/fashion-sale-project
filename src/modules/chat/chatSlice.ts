import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   show: false
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        showChat: (state) => {
            state.show = true
        },
        hideChat: (state) => {
            state.show = false
        }
    },
});

export default chatSlice.reducer;

export const { showChat, hideChat } = chatSlice.actions;