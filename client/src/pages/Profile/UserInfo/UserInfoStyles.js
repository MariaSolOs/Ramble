const styles = () => ({
    formContainer: {
        height: 410,
        margin: '10px 0',
        width: '70%',
        minWidth: 550,
        fontFamily: 'Helvetica, sans-serif',
        '& .rcs-custom-scrollbar': {
            opacity: 1,
            paddingBottom: 100
        },
        '& .rcs-inner-handle': {
            background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
        }
    },
    formRow: {
        margin: '15px 0',
        width: '95%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    formGroup: {
        width: '45%'
    },

    //Form labels
    label: {
        fontFamily: 'inherit',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        letterSpacing: '-0.06rem',
        color: 'white'
    },

    submitButton: {
        padding: '0.7rem 1rem',
        whiteSpace: 'nowrap',
        borderRadius: '0.7rem',
        color: '#FFF',
        background: 'radial-gradient(circle at 75%, #32D6A5C5, #1B8A63)',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        border: 'none',
        cursor: 'pointer',
        float: 'right',
        margin: '0.5rem 1rem 0 0',
        '&:focus': { outline: 'none' }
    }
});
export default styles;