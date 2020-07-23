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
        '& .closeIcon': {
            float: 'left',
            color: '#FFF',
            fontSize: '1.5rem',
            cursor: 'pointer'
        },
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

    //Sign up/log in button
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
        '&:hover': { outline: 'none' }
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
        padding: 5.5,
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
            maxHeight: '100%'
        }
    },

    //Get rid of the link underline
    link: {
        textDecoration: 'none',
        '&:hover': { textDecoration: 'none' }
    },

    //Switching between dialogs
    switchDialogsLink: {
        fontSize: '0.78rem',
        cursor: 'default',
        color: '#6F6E6B',
        letterSpacing: '-0.03rem',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',

        '& span': {
            color: '#ECEBE5',
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },

    //Icon copyright link
    iconsCreditLink: {
        fontSize: '0.65rem',
        fontFamily: 'Helvetica, sans-serif',
        float: 'right',
        color: 'rgba(129, 123, 123, 0.6)',
        '&:hover': { color: 'rgba(129, 123, 123, 0.6)' }
    }
});

export default styles;