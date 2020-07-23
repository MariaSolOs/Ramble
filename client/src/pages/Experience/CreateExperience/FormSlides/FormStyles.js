//Used by all form slides
const baseStyles = {
    //Containers
    flexRow: { 
        display: 'flex',
        flexDirection: 'row',
    },
    flexCol: { 
        display: 'flex',
        flexDirection: 'column' 
    },

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

    //For autocomplete searchbars
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
        padding: '10px 15px',
        '&.MuiAutocomplete-inputRoot[class*="MuiInput-root"]': { 
            paddingBottom: 15,
        },
        //Get rid of the tiny arrow
        '& .MuiAutocomplete-endAdornment': { display: 'none' }
    },
    autocomplete_search_list: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '1rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        maxHeight: 150,
        overflowY: 'scroll',
        letterSpacing: '-0.05rem',
        '& li:hover': { 
            color: '#FFF',
            transition: 'all 200ms ease-in-out',
        }
    },

    addIcon: {
        fontSize: '3.5rem',
        color: 'grey',
        '&:hover': { 
            color: '#CDCDCD',
            transform: 'scale(1.05)',
            transition: 'transform 300ms ease-in-out'
        }
    }
}

