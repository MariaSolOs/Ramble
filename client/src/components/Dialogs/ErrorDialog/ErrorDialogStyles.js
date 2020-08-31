const styles = () => ({
    paper: {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '1.1rem',
        padding: '1% 2%',
    },

    header: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: '-0.05rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        '& img': {
            width: 70,
            height: 70,
            marginRight: 15
        }
    },
    message: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        color: '#DFDFDF',
        letterSpacing: '-0.05rem',
    }
});
export default styles;