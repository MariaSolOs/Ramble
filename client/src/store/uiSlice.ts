import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    showSignUpDialog: boolean;
    showLogInDialog: boolean;
    errorMessage: string;
    snackbarMessage: string;
}

const initialState: UiState = {
    showSignUpDialog: false,
    showLogInDialog: false,
    errorMessage: '',
    snackbarMessage: ''
}

type MessagePayload = { message: string }

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openSignUpDialog: state => {
            state.showSignUpDialog = true;
            state.showLogInDialog = false;
        },
        closeSignUpDialog: state => {
            state.showSignUpDialog = false;
        },
        openLogInDialog: state => {
            state.showSignUpDialog = false;
            state.showLogInDialog = true;
        },
        closeLogInDialog: state => {
            state.showLogInDialog = false;
        },
        openErrorDialog: (state, { payload }: PayloadAction<MessagePayload>) => {
            state.errorMessage = payload.message;
        },
        closeErrorDialog: state => {
            state.errorMessage = '';
        },
        openSnackbar: (state, { payload }: PayloadAction<MessagePayload>) => {
            state.snackbarMessage = payload.message;
        },
        closeSnackbar: state => {
            state.snackbarMessage = '';
        }
    }
});

export const {
    openSignUpDialog,
    closeSignUpDialog,
    openLogInDialog,
    closeLogInDialog,
    openErrorDialog,
    closeErrorDialog,
    openSnackbar,
    closeSnackbar
} = uiSlice.actions;

export default uiSlice.reducer;