import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../shared/interfaces';

interface UserProps {
    currentUser: User
}

const initialState: UserProps = {
    currentUser: {
        _id:'',
        address: '',
        avatar: '',
        email: '',
        name: '',
        password: '',
        phone: '',
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action:PayloadAction<User>) => {
            state.currentUser = action.payload
        },
        signOut: (state) => {
            state.currentUser = {
                _id:'',
                address: '',
                avatar: '',
                email: '',
                name: '',
                password: '',
                phone: '',
            }
        }

    },
});

export default userSlice.reducer;

export const { updateUser, signOut } = userSlice.actions;