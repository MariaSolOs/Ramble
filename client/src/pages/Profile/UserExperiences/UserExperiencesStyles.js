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
        height: 230,
        position: 'relative',
        margin: '1% 4%',
        '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.5s'
        }
    },
    heartButton: {
        position: 'absolute',
        top: 10, right: 10,
        height: 36, width: 36,
        backgroundColor: 'rgba(256, 256, 256, 0.56)',
        '& svg': {
            color: '#FE4164',
            fontSize: '1.25rem'
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