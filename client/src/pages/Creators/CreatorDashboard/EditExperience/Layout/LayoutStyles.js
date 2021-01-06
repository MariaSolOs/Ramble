export const layoutStyles = () => ({
    root: {
        margin: '15vh auto 0',
        display: 'flex',
        width: '90%',
        height: '85vh'
    },

    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        marginLeft: '3vw',
    },

    navDots: { marginBottom: '1.5rem' }
});

export const navbarStyles = () => ({
    nav: {
        listStyle: 'none',
        color: '#5E5E5E',
        width: 170,
        padding: 0,
        margin: '0 10% 0 20px',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.15rem',
        letterSpacing: '-0.05rem',
        whiteSpace: 'nowrap',

        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        },

        '& > li': {
            padding: '0 2px 4px 5px',
            marginBottom: 4,
            '&:hover': {
                color: '#FFF !important',
                textDecoration: 'none',
                fontSize: '102%',
                transition: 'all 200ms ease-in-out'
            },
        },
    },

    current: { 
        borderLeft: 'solid 3px white',
        color: '#FFF'
    },

    stepNav: {
        listStyle: 'none',
        paddingLeft: 20,
        fontSize: '1rem',
        '& li': {
            paddingTop: 6,
            color: '#5E5E5E',
            transition: 'all 200ms ease-in-out',
            '&:hover, &.current': { color: '#FFF' }
        }
    }
});

export const footerStyles = () => ({
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '0.5% 4%',
        maxHeight: 65,
        boxSizing: 'border-box',
        backgroundColor: '#1C1C1C',
        '& button': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '-0.05rem',
            border: 'none',
            cursor: 'pointer',
            '&:focus': { outline: 'none' }
        }
    },

    saveMsg: {
        color: '#FFF',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        display: 'inline-block'
    },
    
    navButton: {
        float: 'right',
        borderRadius: 30,
        color: 'white',
        padding: '1% 4%',
        fontSize: '1.1rem',
    },

    backButton: {
        background: 'radial-gradient(circle at 96%, #2E2E2E, #6F6F6F)',
        marginRight: '1.5rem'
    },

    nextButton: {
        background: 'radial-gradient(circle at 96%, #2BB282, #2D73EA)',
        '&:disabled': { 
            filter: 'brightness(40%)',
            cursor: 'not-allowed'
        }
    }
});