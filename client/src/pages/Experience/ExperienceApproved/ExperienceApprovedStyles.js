const styles = () => ({
    root: {
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        margin: '0 auto',

        '& p': {
            fontFamily: 'Helvetica, sans-serif',
            color: '#CDCDCD',
            fontSize: '1.2rem',
            letterSpacing: '-0.05rem' 
        }
    },

    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
    },

    expTitle: {
        fontWeight: 'bold',
        color: '#FFF'
    },

    referMedia: {
        display: 'flex',
        '& svg': { marginRight: 10 },
        '& .fa-facebook-square': {
            color: '#4267B2',
            fontSize: '3rem'
        },
        '& .fa-facebook-messenger': {
            color: '#0084FF',
            fontSize: '2.2rem'
        }
    }
});
export default styles;