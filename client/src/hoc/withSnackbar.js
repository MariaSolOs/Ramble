import React, {useState} from 'react';

const withSnackbar = (Component, Snackbar) => (props) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const displaySnackbar = (msg) => {
        setSnackbarMsg(msg);
        setOpenSnackbar(true);
    }
    const handleClose = () => setOpenSnackbar(false);

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