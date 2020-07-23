const styles = () => ({
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

    //Style as the creator completes the process
    inactive: { opacity: 0.55 },
    current: { 
        borderLeft: 'solid 3px white',
        color: '#FFF'
    },
    completed: { color: '#FFF' },

    stepNav: {
        listStyle: 'none',
        paddingLeft: 20,
        fontSize: '1rem',
        '& li': {
            paddingTop: 6,
            color: '#5E5E5E',
            transition: 'all 200ms ease-in-out',
            '&:hover, &$completed': { color: '#FFF' }
        }
    }
});

export default styles;