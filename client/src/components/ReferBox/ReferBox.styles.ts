import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: '#FFFFF9',
        borderRadius: '1.5rem',
        width: '100%',
        minWidth: 275,
        padding: '12px 20px 12px 12px',
        boxSizing: 'border-box'
    },

    blackInstruction: {
        color: '#2B2B2B',
        margin: 0,
        fontSize: '1.4rem',
        whiteSpace: 'break-spaces',
        lineHeight: 1.25,

        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    referDiscount: {
        fontSize: '1.75rem'
    },

    greyInstruction: {
        margin: '0 auto 5px 0',
        color: '#878788',
        fontSize: '1.4rem',

        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    mediaContainer: {
        display: 'flex',
        marginTop: '1rem'
    },

    mediaAvatars: {
        backgroundColor: '#E1E2E2',
        display: 'flex',
        borderRadius: '1.2rem',
        padding: 17,
        marginRight: '10%',

        '& .MuiAvatar-root': {
            boxShadow: '10px 10px 20px -7px rgba(0, 0, 0, 0.5)'
        },

        [theme.breakpoints.down('xs')]: { marginRight: 5 }
    },

    middleAvatar: {
        margin: '-3px -13px 0',
        zIndex: 1
    },

    referButtonsContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: 5
    },

    referButton: {
        width: 35,
        height: 35,
        marginRight: 8,
        cursor: 'pointer'
    }
});

export default styles;