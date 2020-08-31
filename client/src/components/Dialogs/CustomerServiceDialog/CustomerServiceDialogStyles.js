const styles = () => ({
    paper: {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.1rem',
        padding: '2% 6% 1.2% 2%',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',

        '& p': { 
            color: '#C0BFBA',
            margin: '5px 0'
        }
    },

    header: {
        '& .title': {
            fontSize: '1.2rem',
            color: '#ECEBE5',
            margin: 0
        }
    },
    content: { padding: '8px 8px 0' },

    contactInfo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        '& svg': {
            color: '#C0BFBA',
            fontSize: '1.25rem',
            marginRight: '1rem'
        }
    }
});
export default styles;