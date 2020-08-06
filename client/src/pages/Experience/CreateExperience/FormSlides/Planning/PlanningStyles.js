const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: '70%',

        '& .MuiInputBase-root': {
            position: 'relative'
        },
        '& .MuiInputAdornment-positionEnd': {
            margin: 0,
            position: 'absolute',
            bottom: 18, right: 15 
        }
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
        marginTop: 0,
        marginBottom: '1rem',
        color: '#CDCDCD',
        lineHeight: 1.5,
        cursor: 'default'
    }
});
export default styles;