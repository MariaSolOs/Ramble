const styles = () => ({
    root: {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '& p': {
            fontFamily: 'Helvetica, sans-serif',
            color: '#CDCDCD',
            fontSize: '1.2rem',
            letterSpacing: '-0.05rem' 
        },
        '& a': { textDecoration: 'none' },
    },

    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
    },

    stripeLink: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '2rem',
        '& a': { textAlign: 'center' },
        '& p': { 
            margin: '0 0 -10px',
            fontWeight: 'bold' 
        },
        '& svg': {
            color: '#4379FF',
            fontSize: '5rem'
        }
    },

    gotItButton: {
        background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)',
        border: 'none',
        borderRadius: '1.7rem',
        fontSize: '1.05rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.02rem',
        padding: '10px 20px',
        color: '#FFF',
        width: 130,
        textAlign: 'center',
        cursor: 'pointer',
        margin: '2rem auto 0',
        display: 'block',
        '&:focus': { outline: 'none' }
    }
});
export default styles;