const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        minHeight: '70vh',
        width: '90%',
        margin: '15vh auto 0'
    },

    body: {
        display: 'flex',
        width: '100%', 
        justifyContent: 'space-between',
        position: 'relative',
    },
    page: {
        width: '80%'
    },

    //Header with avatar
    header: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        '& img': {
            width: '8rem',
            height: '8rem',
            borderRadius: '50%'
        }
    },

    userHeader: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '2.5rem',
        letterSpacing: '-0.06rem',
        fontFamily: 'Helvetica, sans-serif',
        '& h1': {
            fontWeight: 'bold',
            fontSize: '2.2rem',
            color: '#E6E6E6',
            margin: 0
        },
        '& p': {
            color: '#ACACAC',
            fontSize: '1.3rem',
            margin: 0
        }
    },

    //Tooltip 
    tooltip: {
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontWeight: 'bold',
        fontSize: 13,
        whiteSpace: 'nowrap'
    },
    tooltipPlacement: { margin: '-10px auto 0 -5px' },

    //Shadow divider
    shadowSeparator: {
        padding: 6,
        borderRadius: 10,
        margin: '0 3% 100px 0',
        background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
    },

    navbar: {
        width: '25%',
        minWidth: 190
    }
});
export default styles;