import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Snackbar {
    text: string,
    show: boolean,
    delay?: number,
}

const initialState: Snackbar = {
    show: false,
    text: "Chào mừng bạn đã trở lại, vui vẻ mua sắm cùng TIKI nhé!",
    delay: 1000
};

const SnackbarSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<Snackbar>) => {
            state.show = true
            state.delay = action.payload.delay
            state.text = action.payload.text
        },
        hideSnackbar: (state) => {
            state.show = false
        }
    },
});

export default SnackbarSlice.reducer;

export const { showSnackbar, hideSnackbar } = SnackbarSlice.actions;