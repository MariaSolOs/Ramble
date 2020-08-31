const styles = (theme) => ({
    textField_root: { 
        width: '100%',
        '&:focus': { outline: 'none' }
    },
    input_root: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '2rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        padding: '8px 15px',
        width: '100%',
        justifyContent: 'center',
        '& .MuiInputAdornment-root .MuiTypography-body1': {
            color: '#929293',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
            letterSpacing: '-0.05rem',
        }
    },
    input_input: { 
        textAlign: 'center',
        //Dynamic width according to input size
        width: props => theme.spacing(props.inputLength * 1.8),
        padding: '6px 0 6px'
    },
    numFieldButtons: {
        display: 'flex',
        flexDirection: 'column',
        '& svg': {
            color: '#2A2A2A',
            cursor: 'pointer',
            '&:hover': {
                color: '#FFF',
                transition: 'all 200ms ease-in-out',
            }
        }
    }
});
export default styles;