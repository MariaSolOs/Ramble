import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isLoggedIn: boolean;
    isCreator: boolean;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    phoneNumber: string;
    photo: string;
    city: string;
}

const initialState: UserState = {
    isLoggedIn: false,
    isCreator: false,
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    phoneNumber: '',
    photo: '',
    city: ''
}

type SetUserProfilePayload = Partial<UserState>;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, { payload }: PayloadAction<SetUserProfilePayload>) => {
            for (const [fieldName, fieldValue] of Object.entries(payload)) {
                (state as any)[fieldName] = fieldValue;
            }
        },
        logout: () => initialState
    }
});

export const { setUserProfile, logout } = userSlice.actions;

export default userSlice.reducer;