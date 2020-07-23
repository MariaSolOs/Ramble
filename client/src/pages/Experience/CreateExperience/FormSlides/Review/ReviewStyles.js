const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        marginBottom: '3%'
    },

    //General text
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        margin: 0,
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
    },

    experience: {
        position: 'relative',
        display: 'flex',
        margin: '0 auto',
        transform: 'scale(0.8)',
    }
});
export default styles;