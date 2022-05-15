import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
    type: "success" | "error" | "warning",
    text: string,
    show: boolean,
    delay?: number,
}

const initialState: Toast = {
    type: "success",
    show: false,
    text: "Chào mừng bạn đã trở lại, vui vẻ mua sắm cùng TIKI nhé!",
    delay: 1000
};

const ToastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<Toast>) => {
            state.show = true
            state.delay = action.payload.delay
            state.type = action.payload.type
            state.text = action.payload.text
        },
        hideToast: (state) => {
            state.show = false
        }
    },
});

export default ToastSlice.reducer;

export const { showToast, hideToast } = ToastSlice.actions;