const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '70vh',
        maxHeight: '84vh',
        width: '100vw',
        margin: '13vh 0 3vh'
    },
    page: {
        width: 'calc(100% - 10px - 6%)',
        maxHeight: '100%'
    },
    shadowSeparator: {
        padding: 5,
        borderRadius: '2rem',
        margin: '0 3%',
        background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
    },
    
    sortBar: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '38%',
        minWidth: 380,
        marginTop: 20,
        '& button': {
            color: '#FFF',
            backgroundColor: '#2D2E2E',
            font: 'inherit',
            fontSize: '0.9rem',
            letterSpacing: '-0.05rem',
            borderRadius: '2rem',
            padding: '0.7rem 1rem',
            textAlign: 'center',
            width: '38%',
            border: 'none',
            cursor: 'pointer',
            '&:focus': { outline: 'none' }
        }
    },

    requests: {
        display: 'flex',
        width: '100%',
        height: 'calc(84vh - 28px - 29px - 24px)',
        marginTop: -10,
        overflowX: 'scroll'
    },
    request: { 
        margin: '10px 40px 0 0',
        '&:last-child': {
            paddingRight: 40 
        }
    }
});
export default styles;