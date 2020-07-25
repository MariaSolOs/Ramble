const styles = () => ({
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

    payInfo: {
        width: '90%',
        margin: '0 auto'
    },

    label: {
        margin: '0 0 10px',
        color: '#C8C8C8',
        font: 'inherit',
        fontSize: '0.95rem',
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
            fontSize: '1.3rem',
        },
        '& span': { fontSize: '0.9rem' }
    },

    policyMessage: {
        font: 'inherit',
        fontWeight: 400,
        color: '#C8C8C8',
        fontSize: '0.9rem',
        margin: '1.2rem auto 1rem',
        width: '80%',
        '& a': {
            textDecoration: 'none',
            fontWeight: 'bold',
            color: 'inherit'
        }
    }
});
export default styles;