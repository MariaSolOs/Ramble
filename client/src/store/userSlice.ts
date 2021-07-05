import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { CoreProfileFragment } from 'graphql-api';

type SetProfilePayload = CoreProfileFragment;
type EditSavedExperiencesPayload = { experienceId: string; }

interface UserState {
    isLoggedIn: boolean;
    isCreator: boolean;
    firstName: string;
    email: string,
    photo: string;
    savedExperiences: string[];
}

const initialState: UserState = {
    isLoggedIn: false,
    isCreator: false,
    firstName: '',
    email: '',
    photo: '',
    savedExperiences: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, { payload }: PayloadAction<SetProfilePayload>) => {
            state.isLoggedIn = true;
            state.isCreator = Boolean(payload.creator?._id);
            state.firstName = payload.firstName;
            state.email = payload.email;
            state.photo = payload.photo || '';
            state.savedExperiences = payload.savedExperiences.map(({ _id }) => _id);
        },
        logout: () => initialState,
        saveExperience: (state, { payload }: PayloadAction<EditSavedExperiencesPayload>) => {
            state.savedExperiences.push(payload.experienceId);
        },
        unsaveExperience: (state, { payload }: PayloadAction<EditSavedExperiencesPayload>) => {
            state.savedExperiences = state.savedExperiences.filter(id => 
                id !== payload.experienceId
            );
        }
    }
});

export const { 
    setProfile, 
    logout,
    saveExperience,
    unsaveExperience
} = userSlice.actions;

export default userSlice.reducer;