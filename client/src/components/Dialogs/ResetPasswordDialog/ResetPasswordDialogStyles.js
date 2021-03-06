const styles = (theme) => ({
    paper: {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.1rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        padding: '1%'
    },

    closeIcon: {
        float: 'left',
        color: '#FFF',
        fontSize: '1.5rem',
        cursor: 'pointer'
    },

    formControl: {
        marginBottom: 20,
        '& label': {
            color: '#ECEBE5', 
            fontFamily: 'Helvetica, sans-serif',
            fontSize: '0.85rem',
            textIndent: 3,
            letterSpacing: '-0.03rem',
            marginBottom: 5
        },
        '& .MuiOutlinedInput-input': {
            padding: '15px 12px'
        }
    },

    submitButton: {
        display: 'block',
        width: '100%',
        padding: '0.45rem 0.75rem',
        borderRadius: '0.2rem',
        border: 'none',
        background: 'radial-gradient(circle at -21.27%, #2BB282, #2D73EA)',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem',
        color: '#ECEBE5',
        cursor: 'pointer',
        '&:focus': { outline: 'none' }
    }
});

export default styles;