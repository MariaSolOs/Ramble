const styles = (theme) => ({
    root: {
        minHeight: '70vh',
        maxHeight: '84vh',
        width: 'calc(94% - 83.65px)',
        margin: '13vh auto 3vh'
    },

    title: {
        color: '#FFF',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: '2rem',
        '& a': { 
            textDecoration: 'none',
            color: '#FFF'
        }
    }
});
export default styles;