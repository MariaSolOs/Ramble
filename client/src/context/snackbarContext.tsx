import React, { useState, createContext, useContext } from 'react';

type SnackbarContextType = {
    message: string;
    showSnackbar: (msg: string) => void;
    hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
    message: '',
    showSnackbar: () => {},
    hideSnackbar: () => {}
});

const useSnackbarContext = () => useContext(SnackbarContext);

/**
 * Context to display the snackbar from anywhere on the application.
 */
export const SnackbarContextProvider: React.FC = (props) => {
    const [message, setMessage] = useState('');

    const showSnackbar = (message: string) => {
        setMessage(message);
    }

    const hideSnackbar = () => {
        setMessage('');
    }

    return (
        <SnackbarContext.Provider value={{ message, showSnackbar, hideSnackbar }}>
            {props.children}
        </SnackbarContext.Provider>
    );
}

export default useSnackbarContext;