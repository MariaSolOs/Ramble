import React, {useState, useCallback} from 'react';

const withSnackbar = (Component, Snackbar) => (props) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const displaySnackbar = useCallback((msg) => {
        if(msg.length > 0) {
            setSnackbarMsg(msg);
            setOpenSnackbar(true);
        }
    }, []);
    const handleClose = useCallback(() => {
        setSnackbarMsg('');
        setOpenSnackbar(false);
    }, []);

    return (
        <>
            <Snackbar
            open={openSnackbar}
            onClose={handleClose}
            message={snackbarMsg}/>
            <Component {...props} displaySnackbar={displaySnackbar}/>
        </>
    );
}

export default withSnackbar;