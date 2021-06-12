import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';

import type { Client } from 'gqlClient';

const USER_DATA = gql`
    fragment UserData on User {
        _id
        token
        firstName
        photo
        savedExperiences {
            _id
        }
        creator {
            _id
        }
    }
`;

const FETCH_USER = gql`
    query fetchUser {
        me {
            ...UserData
        }
    }
    ${USER_DATA}
`;

const LOG_IN_USER = gql`
    mutation logIn($email: String!, $password: String!, $rememberUser: Boolean!) {
        logInUser(email: $email, password: $password, rememberUser: $rememberUser) {
            ...UserData
        }
    }
    ${USER_DATA}
`;

const SIGN_UP_USER = gql`
    mutation signUp($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
        signUpUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
            ...UserData
        }
    }
    ${USER_DATA}
`;

const SAVE_EXPERIENCE = gql`
    mutation saveExp($experienceId: String!) {
        saveExperience(experienceId: $experienceId) {
            code
        }
    }
`;

const UNSAVE_EXPERIENCE = gql`
    mutation unsaveExp($experienceId: String!) {
        unsaveExperience(experienceId: $experienceId) {
            code
        }
    }
`;

type UserData = {
    _id: string;
    token: string;
    firstName: string;
    photo: string;
    savedExperiences: { _id: string }[];
    creator: { _id: string; }
}

type LogInUserPayload = { 
    email: string; 
    password: string; 
    rememberUser: boolean;
}

type SignUpPayload = {
    email: string; 
    password: string;
    firstName: string; 
    lastName: string; 
}

type UpdateUIProfilePayload = {
    isCreator?: boolean;
    firstName?: string;
    photo?: string;
}

type EditSavedExperiencesPayload = { experienceId: string; }

type EditSavedExperiences = { code: number; }

interface UserState {
    isLoggedIn: boolean;
    isCreator: boolean;
    firstName: string;
    photo: string;
    savedExperiences: string[];
}

const initialState: UserState = {
    isLoggedIn: false,
    isCreator: false,
    firstName: '',
    photo: '',
    savedExperiences: []
}

/**
 * Based on if the user wants to be remembered, store new token.
 * 
 * @param token - JWT encrypted token
 * @param rememberUser - True if the token should persist sessions
 */
const updateToken = (token: string, rememberUser: boolean) => {
    if (rememberUser) {
        localStorage.setItem('ramble-token', token);
    } else {
        sessionStorage.setItem('ramble-token', token);
    }
}

export const fetchProfile = createAsyncThunk(
    'user/fetchProfileStatus',
    async (_, { extra }) => {
        const client = extra as Client;

        const { data } = await client.query<{ me: UserData }>({
            query: FETCH_USER
        });

        updateToken(data.me.token, Boolean(localStorage.getItem('ramble-token')));

        return data.me;
    }
);

export const logIn = createAsyncThunk(
    'user/logInStatus',
    async (payload: LogInUserPayload, { extra }) => {
        const client = extra as Client;

        const { data, errors } = await client.mutate<{ logInUser: UserData }, LogInUserPayload>({
            mutation: LOG_IN_USER,
            variables: payload
        });

        if (errors) { throw new Error(errors[0].message); }
        if (!data) { throw new Error('Log in failed.'); }

        updateToken(data.logInUser.token, payload.rememberUser);

        return data.logInUser;
    }
);

export const signUp = createAsyncThunk(
    'user/signUpStatus',
    async (payload: SignUpPayload, { extra }) => {
        const client = extra as Client;

        const { data, errors } = await client.mutate<{ signUpUser: UserData }, SignUpPayload>({
            mutation: SIGN_UP_USER,
            variables: { ...payload }
        });

        if (errors) { throw new Error(errors[0].message); }
        if (!data) { throw new Error('Sign up failed.'); }

        updateToken(data.signUpUser.token, false);
        
        return data.signUpUser;
    }
);

export const saveExperience = createAsyncThunk(
    'user/saveExperienceStatus',
    async ({ experienceId }: EditSavedExperiencesPayload, { extra }) => {
        const client = extra as Client;

        const { data, errors } = await client.mutate<{ saveExperience: EditSavedExperiences }, EditSavedExperiencesPayload>({
            mutation: SAVE_EXPERIENCE,
            variables: { experienceId }
        });

        if (errors) { throw new Error(errors[0].message); }
        if (!data) { throw new Error("We couldn't save the experience..."); }

        return experienceId;
    }
);

export const unsaveExperience = createAsyncThunk(
    'user/unsaveExperienceStatus',
    async ({ experienceId }: EditSavedExperiencesPayload, { extra }) => {
        const client = extra as Client;

        const { data, errors } = await client.mutate<{ unsaveExperience: EditSavedExperiences }, EditSavedExperiencesPayload>({
            mutation: UNSAVE_EXPERIENCE,
            variables: { experienceId }
        });

        if (errors) { throw new Error(errors[0].message); }
        if (!data) { throw new Error("We couldn't unsave the experience..."); }

        return experienceId;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUIProfile: (state, { payload }: PayloadAction<UpdateUIProfilePayload>) => {
            for (const [field, value] of Object.entries(payload)) {
                (state as any)[field] = value;
            }
        },
        logout: () => initialState
    },
    extraReducers: builder => {
        const setProfile = (state: UserState, { payload }: PayloadAction<UserData>) => {
            state.isLoggedIn = true;
            state.isCreator = Boolean(payload.creator._id);
            state.firstName = payload.firstName;
            state.photo = payload.photo;
            state.savedExperiences = payload.savedExperiences.map(({ _id }) => _id);
        }
        builder.addCase(fetchProfile.fulfilled, setProfile);
        builder.addCase(logIn.fulfilled, setProfile);
        builder.addCase(signUp.fulfilled, setProfile);

        builder.addCase(saveExperience.fulfilled, (state, { payload }) => {
            state.savedExperiences.push(payload);
        });

        builder.addCase(unsaveExperience.fulfilled, (state, { payload }) => {
            state.savedExperiences = state.savedExperiences.filter(id => 
                id !== payload
            );
        });
    }
});

export const { updateUIProfile, logout } = userSlice.actions;

export default userSlice.reducer;