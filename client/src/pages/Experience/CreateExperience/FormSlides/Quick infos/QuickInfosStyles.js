const styles = (theme) => ({
    //General text
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '0.5rem',
        color: '#FFF',
        cursor: 'default' 
    },
    description: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '1rem',
        color: '#CDCDCD',
        lineHeight: 1.5,
        cursor: 'default'
    },
    greyCaps: {
        color: '#CDCDCD',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        fontSize: '1rem',
        margin: '0 1rem'
    },
    
    formGroup: {
        margin: '2% 0',
        width: '90%',
        '& $title': {
            fontSize: '2rem',
            marginBottom: 0
        }
    },
    checkboxRow: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '25%',
        '& > div': {
            display: 'flex',
            alignItems: 'center'
        },
        '& $description': { margin: 0 }
    },
    
    //For the duration +-
    numField: {
        display: 'flex',
        width: '15rem'
    },
    numField_textField_root: { 
        width: '100%',
        '&:focus': { outline: 'none' }
    },
    numField_input_root: {
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
    numField_input_input: { 
        textAlign: 'center',
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
    },

    tip: {
        display: 'inline-flex',
        '& svg': {
            margin: '0 0.5rem auto auto'
        }
    },

    //For autocomplete language searchbar
    autocomplete_textfield_root: { '&:focus': { outline: 'none' }},
    autocomplete_input_focused: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CDCDCD !important'
        }
    },
    autocomplete_input_root: {
        backgroundColor: '#2A2A2A',
        color: '#FFF',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        width: 340,
        letterSpacing: '-0.05rem',
        paddingRight: '9px !important',
        '& .MuiChip-root': { textTransform: 'capitalize' },
        //Get rid of the tiny arrow
        '& .MuiAutocomplete-endAdornment': { display: 'none' },
    },
    autocomplete_search_list: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '1rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        maxHeight: 220,
        overflowY: 'scroll',
        letterSpacing: '-0.05rem',
        '& li': {
            paddingTop: 3,
            paddingBottom: 3,
            textTransform: 'capitalize',
            '&:hover': {
                color: '#FFF',
                transition: 'all 200ms ease-in-out',
            }
        }
    },
    autocomplete_loading_popper: { 
        '& .MuiAutocomplete-loading': { color: '#FFF !important' }
    }
});
export default styles;