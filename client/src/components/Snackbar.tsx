import useSnackbarContext from 'context/snackbarContext';

import MUISnackbar from '@material-ui/core/Snackbar';

const Snackbar = () => {
    const { message, hideSnackbar } = useSnackbarContext();

    return (
        <MUISnackbar
        anchorOrigin={{ 
            vertical: 'top', 
            horizontal: 'right'
        }}
        open={Boolean(message)}
        onClose={hideSnackbar}
        message={message} />
    );
}

export default Snackbar;