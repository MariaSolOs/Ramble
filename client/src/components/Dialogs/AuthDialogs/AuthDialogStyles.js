const styles = (theme) => ({
    paper: {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '1.1rem',
        padding: '1%',
        minWidth: 400,
        '&.MuiDialog-paperWidthSm': {
            maxWidth: 500
        }
    },

    //Modal header
    header: {
        display: 'flex',
        alignContent: 'center',
        padding: '0.9rem 1rem 0.7rem 1rem',

        '& .title': {
            margin: 'auto',
            textIndent: -22,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            letterSpacing: '-0.03rem',
            color: '#ECEBE5',
            fontFamily: 'Helvetica, sans-serif'
        }
    },

    closeIcon: {
        float: 'left',
        color: '#FFF',
        fontSize: '1.5rem',
        cursor: 'pointer'
    },

    //Form sections
    formControl: {
        marginBottom: 20,
        '& label': {
            color: '#ECEBE5', 
            fontFamily: 'Helvetica, sans-serif',
            fontSize: '0.85rem',
            textIndent: 3,
            letterSpacing: '-0.03rem',
            marginBottom: 5
        },
        '& .MuiOutlinedInput-input': {
            padding: '15px 12px'
        }
    },

    //Linebreak
    formDivisor: {
        width: '30%',
        padding: '1.5%',
        margin: '20px auto',
        borderBottom: 'solid 1px #4F4F4F'
    },

    submitButton: {
        display: 'block',
        width: '100%',
        padding: '0.45rem 0.75rem',
        borderRadius: '0.2rem',
        border: 'none',
        background: 'radial-gradient(circle at -21.27%, #2BB282, #2D73EA)',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem',
        color: '#ECEBE5',
        cursor: 'pointer',
        '&:focus': { outline: 'none' }
    },

    //Sign up/log in with media buttons
    mediaButton: {
        display: 'block',
        width: '100%',
        whiteSpace: 'nowrap',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '0.25rem',
        backgroundColor: '#161616',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        padding: '7px 5.5px',
        textIndent: -22,
        lineHeight: '30px',
        alignItems: 'center',
        height: 40,
        fontSize: '0.85rem',
        letterSpacing: '-0.02rem',
        color: '#ECEBE5',
        margin: '3% auto',
        '&:focus': { outline: 'none' },

        '& .icon': {
            float: 'left',
            width: 'auto',
            height: '100%'
        }
    },

    // Get rid of the link underline
    link: {
        textDecoration: 'none',
        '&:hover': { textDecoration: 'none' }
    },

    // Switching between dialogs
    switchDialogsText: {
        fontSize: '0.78rem',
        cursor: 'default',
        color: '#6F6E6B',
        letterSpacing: '-0.03rem',
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem 0 0',

        '& span': {
            color: '#ECEBE5',
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },

    // Forgot password link
    forgotLink: {
        color: '#ECEBE5',
        textDecoration: 'underline',
        cursor: 'pointer',
        margin: '-10px 3px 15px',
        fontWeight: 'bold',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontSize: '0.8rem'
    },

    forgotTitle: {
        color: '#ECEBE5',
        margin: 0,
        fontWeight: 'bold',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontSize: '1.1rem'
    },

    forgotMessage: {
        color: '#C0BFBA',
        margin: '1rem 0',
        fontWeight: 'bold',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontSize: '0.9rem'
    },

    resetEmailSentMsg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.8rem 0',

        '& .fa-paper-plane': {
            fontSize: '2rem',
            marginRight: '1rem',
            color: '#FFF'
        }
    }
});

export default styles;