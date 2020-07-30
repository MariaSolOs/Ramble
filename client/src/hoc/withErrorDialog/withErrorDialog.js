import React, {useState, useCallback} from 'react';

import ErrorDialog from './ErrorDialog';

const withErrorDialog = (Component) => (props) => {
    const [openErrDialog, setOpenErrDialog] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const displayError = useCallback((msg) => {
        setErrMsg(msg);
        setOpenErrDialog(true);
    }, []);
    const handleClose = useCallback(() => {
        setErrMsg('');
        setOpenErrDialog(false);
    }, []);

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