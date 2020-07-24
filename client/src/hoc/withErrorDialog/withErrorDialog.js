import React, {useState} from 'react';

import ErrorDialog from './ErrorDialog';

const withErrorDialog = (Component) => (props) => {
    const [openErrDialog, setOpenErrDialog] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const displayError = (msg) => {
        setErrMsg(msg);
        openErrDialog(true);
    }
    const handleClose = () => setOpenErrDialog(false);

    return (
        <>
            <ErrorDialog
            open={openErrDialog}
            onClose={handleClose}
            message={errMsg}/>
            <Component {...props} displayError={displayError}/>
        </>
    );
}

export default withErrorDialog;