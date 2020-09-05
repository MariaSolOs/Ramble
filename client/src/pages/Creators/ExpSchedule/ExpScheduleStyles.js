const styles = () => ({
    root: {
        height: '84vh',
        margin: '13vh auto 3vh',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem'
    },

    content: {
        width: '90%',
        height: '100%',
        margin: '0 auto',
        position: 'relative'
    },

    title: {
        color: '#FFF',
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '0 0 8px',
        '&.date': {  fontSize: '1.5rem' }
    },

    instruction: {
        fontWeight: 'bold',
        color: '#CDCDCD',
        fontSize: '1.1rem'
    },

    button: {
        borderRadius: '2rem',
        border: 'none',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        letterSpacing: '-0.04rem',
        cursor: 'pointer',
        '&:focus': { outline: 'none' }
    },
    saveButton: {
        position: 'absolute',
        bottom: 20, right: 20,
        width: 135,
        height: 45,
        background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)',
        color: '#ECEBE5'
    },
    doneButton: {
        display: 'block',
        margin: '1rem auto',
        background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)',
        color: '#ECEBE5',
        width: 180,
        height: 40
    },

    done: {
        margin: 'auto',
        width: '60%',

        '& h3': {
            color: '#FFF',
            fontSize: '1.8rem',
            textAlign: 'center'
        }
    }
});
export default styles;