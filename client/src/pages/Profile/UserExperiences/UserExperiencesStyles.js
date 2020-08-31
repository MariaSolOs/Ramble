const styles = (theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    nav: {
        display: 'flex',
        marginLeft: -100,
        '& a': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            letterSpacing: '-0.05rem',
            textDecoration: 'none',
            color: '#ACACAC',
            '&.active, &:active, &:hover': {
                color: '#FFF',
                textDecoration: 'none'
            }
        }
    },
    
    //Experience cards
    gallery: {
        overflowY: 'scroll',
        width: '70%',
        padding: '4%',
        display: 'block',
        margin: '0 auto 3%'
    },
    card: {
        borderRadius: '1.5rem',
        display: 'inline-block',
        overflow: 'hidden',
        width: '40%',
        minWidth: 170,
        height: 270,
        position: 'relative',
        margin: '0 4% 4% 0',
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