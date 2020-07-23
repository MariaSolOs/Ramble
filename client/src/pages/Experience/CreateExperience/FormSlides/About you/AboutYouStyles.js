const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: '70%'
    },
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
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        margin: 0,
        color: '#CDCDCD',
        lineHeight: 1.5,
        cursor: 'default'
    },
    tip: {
        display: 'inline-flex',
        '& svg': {
            margin: '0 0.5rem auto auto'
        }
    }
});
export default styles;