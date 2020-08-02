import {uiTypes as types} from '../actionTypes';

export const startLoading = () => ({ 
    type: types.START_LOADING
});
export const endLoading = () => ({ 
    type: types.END_LOADING
});
export const showError = (message) => ({
    type: types.SHOW_ERROR, message
});
export const showSnackbar = (message) => ({
    type: types.SHOW_SNACKBAR, message
});
export const messageShown = () => ({
    type: types.MESSAGE_SHOWN
});
