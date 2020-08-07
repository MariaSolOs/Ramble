const styles = () => ({
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
        marginTop: '1.5rem',
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
        flexWrap: 'wrap',
        width: '100%',
        marginTop: -10
    },
    request: { 
        marginTop: 20,
        '&:nth-child(2n)': { marginLeft: 50 }
    }
});
export default styles;