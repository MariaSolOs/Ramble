const styles = () => ({
    paper: {
        backgroundColor: '#151515',
        borderRadius: '1.1rem',
        padding: '1rem 0.7rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },

    header: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '0 0 0 10px',
        font: 'inherit',
        '& .goBackIcon': {
            float: 'left',
            color: '#FFF',
            fontSize: '2.5rem',
            marginLeft: -10,
            cursor: 'pointer',
            display: 'block',
        },
        '& .title': {
            margin: '1rem auto 1rem 0',
            fontSize: '1.4rem',
            color: '#FFF',
        },
    },

    expWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1.5rem'
    },

    formSummary: {
        width: '90%',
        margin: '0 auto'
    },

    label: {
        margin: '0 0 10px',
        color: '#C8C8C8',
        font: 'inherit',
        fontSize: '0.95rem',
    },

    numGuests: {
        color: '#FFF',
        fontSize: '1.1rem',
        margin: '0 0 1rem',
        '& span': { fontSize: '1.25rem' }
    },

    priceRow: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        margin: '1rem 0',
        '& p': {
            margin: 0,
            font: 'inherit',
            color: '#FFF',
            fontSize: '1.2rem',
            '&.total': { fontSize: '1.3rem' },
        },
        '& span': { fontSize: '0.9rem' }
    },

    policyMessage: {
        font: 'inherit',
        fontWeight: 400,
        color: '#C8C8C8',
        fontSize: '0.9rem',
        margin: '1rem auto 1.5rem',
        width: '80%',
        '& a': {
            textDecoration: 'none',
            fontWeight: 'bold',
            color: 'inherit'
        }
    },

    continueButton: {
        display: 'block',
        width: '85%',
        margin: '0 auto',
        padding: '0.6rem 0.75rem',
        borderRadius: '0.4rem',
        border: 'none',
        background: 'radial-gradient(circle at -21.27%, #2BB282, #2D73EA)',
        font: 'inherit',
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem',
        color: '#ECEBE5',
        cursor: 'pointer',
        transition: 'filter 200ms ease-in',
        '&:focus': { outline: 'none' },
        '&:hover': { outline: 'none' }
    }
});
export default styles;