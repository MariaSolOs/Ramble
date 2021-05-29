import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    showSignUpDialog: boolean;
    showLogInDialog: boolean;
    errorMessage: string;
}

const initialState: UiState = {
    showSignUpDialog: false,
    showLogInDialog: false,
    errorMessage: ''
}

type OpenErrorDialogPayload = { message: string }

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
        openErrorDialog: (state, { payload }: PayloadAction<OpenErrorDialogPayload>) => {
            state.errorMessage = payload.message;
        },
        closeErrorDialog: state => {
            state.errorMessage = '';
        }
    }
});

export const {
    openSignUpDialog,
    closeSignUpDialog,
    openLogInDialog,
    closeLogInDialog,
    openErrorDialog,
    closeErrorDialog
} = uiSlice.actions;

export default uiSlice.reducer;