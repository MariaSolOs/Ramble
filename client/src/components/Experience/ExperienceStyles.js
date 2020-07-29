const styles = (theme) => ({
    body: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        width: '55%',
        marginLeft: '3%',
        [theme.breakpoints.down('sm')]: { 
            width: '80%',
            margin: '0 auto'
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: '1.6rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        margin: 0
    },

    location: {
        fontSize: '0.95rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        margin: '0.5rem 0'
    },

    categories: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 280,
        margin: '8px 0',
        '& h5': {
            fontSize: '0.85rem'
        }
    },

    //For section labels and paragraphs
    label: {
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        marginBottom: 0
    },
    text: {
        fontSize: '0.97rem',
        letterSpacing: '-0.05rem',
        color: '#C8C8C8',
        lineHeight: 1.4
    }
});
export default styles;