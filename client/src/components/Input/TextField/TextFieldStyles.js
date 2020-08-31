const styles = () => ({
    textField_root: { fontFamily: 'Helvetica, sans-serif' },
    label_root: { opacity: 0 },
    label_focused: {
        color: '#CDCDCD !important',
        background: 'linear-gradient(to bottom, #151515 0%, #2A2A2A 60%)',
        paddingRight: 5,
        opacity: 1,
        fontWeight: 'bold',
    },
    input_root: { 
        backgroundColor: '#2A2A2A',
        color: '#FFF',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D8246E'
        }
    },
    input_focused: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CDCDCD !important'
        }
    },
    helperText_root: {
        '&.MuiFormHelperText-root.Mui-error': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            color: '#D8246E',
            letterSpacing: '-0.01rem'
        }
    }
});
export default styles;