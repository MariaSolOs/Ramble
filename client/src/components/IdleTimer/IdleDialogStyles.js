const styles = () => ({
    //Containers
    paper: {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '1.1rem',
        padding: '1%',
    },
    actions_root: { padding: 0 },

    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#DFDFDF',
        letterSpacing: '-0.05rem',
        paddingTop: 5
    },

    //Clock image
    clock: {
        height: 80,
        width: 80,
        margin: '0 auto'
    },
    closeButton: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#DFDFDF',
        letterSpacing: '-0.05rem',
        backgroundColor: '#4F4F4F',
        border: 'none',
        margin: '1rem auto 0',
        width: '80%',
        padding: '0.8rem 1.8rem',
        borderRadius: '0.8rem',
        cursor: 'pointer', 
        '&:focus': { outline: 'none' }
    }
});
export default styles;