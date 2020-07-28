const styles = (theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    //Experience cards
    gallery: {
        overflowY: 'scroll',
        width: '75%',
        display: 'block',
        margin: '2% auto 3%'
    },
    card: {
        borderRadius: '1.5rem',
        display: 'inline-block',
        overflow: 'hidden',
        width: '40%',
        minWidth: 170,
        height: 250,
        position: 'relative',
        margin: '1% 4%',
        '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.5s'
        }
    },

    exploreLink: {
        textAlign: 'center',
        textIndent: -100,
        '& a': {
            textDecoration: 'none',
            color: '#FFF',
            fontFamily: 'Helvetica, sans-serif',
            letterSpacing: '-0.05rem',
            fontSize: '2rem'
        }
    }
});

export default styles;