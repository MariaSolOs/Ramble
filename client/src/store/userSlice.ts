import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    phoneNumber: string;
    photo: string;
    city: string;
}

const initialState: UserState = {
    id: '',
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
                state[fieldName as keyof UserState] = fieldValue!;
            }
        }
    }
});

export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;