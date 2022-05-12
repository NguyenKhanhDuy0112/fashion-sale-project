import { createSlice } from '@reduxjs/toolkit';

interface ToggleNav {
    current: false;
}

const initialState: ToggleNav = {
    current: false,
};

const ToggleNavBar = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        toggleNav: (state, action) => {
            state.current = action.payload
        }
        
    },
});

export default ToggleNavBar.reducer;

export const { toggleNav } = ToggleNavBar.actions;