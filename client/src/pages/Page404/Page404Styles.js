const styles = () => ({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        display: 'flex',
        maxWidth: 760,
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        '& .oh-no-face': {
            width: 90,
            height: 90,
            marginRight: '1.8rem'
        }
    },

    title: {
        color: '#FFF',
        fontSize: '2.6rem',
        margin: 0,
        letterSpacing: '-0.1rem'
    },
    subtitle: {
        color: '#FFF',
        fontSize: '1.25rem',
        letterSpacing: '-0.05rem',
        margin: '0 0 1.5rem'
    },
    message: {
        letterSpacing: '-0.05rem',
        color: '#C5C5C5',
        margin: 0,
        fontSize: '1.1rem'
    }
});
export default styles;