const styles = () => ({
    //General text
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '0.5rem',
        color: '#FFF',
        cursor: 'default' 
    },
    description: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.05rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '0.5rem',
        color: '#CDCDCD',
        cursor: 'default',
    },
    tips: {
        margin: '1rem 0',
        '& p': { 
            margin: '0 0 9px 0'
        }
    }
});
export default styles;