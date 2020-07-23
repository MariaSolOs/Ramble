const styles = (theme) => ({
    root: {
        width: '85%',
        margin: '0 auto 1%',
        display: 'flex',
        flexDirection: 'column',
        //Rows
        '& > div': { 
            display: 'flex',
            marginBottom: '1rem' 
        },
        '& .locSearchbar': { 
            width: '28%',
            marginRight: '2%' 
        },
        '& .numField': {
            width: '13%',
            minWidth: '10rem',
            marginRight: '2%',
            display: 'flex'
        }
    },

    //For location searchbar
    textField_root: { '&:focus': { outline: 'none' }},
    input_root: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '2rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        padding: '10px 15px',
        '&.MuiAutocomplete-inputRoot[class*="MuiInput-root"]': { 
            paddingBottom: 10,
            paddingRight: 15
        },
        //Get rid of the tiny arrow
        '& .MuiAutocomplete-endAdornment': { display: 'none' }
    },
    search_list: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '1rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',
        '& li:hover': { 
            color: '#FFF',
            transition: 'all 200ms ease-in-out',
        }
    },

    //Title searchbar
    titleSearch: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        color: '#929293',
        width: '28%',
        padding: '10px 15px',
        height: 45,
        '& .MuiInputAdornment-root': { marginRight: '0.5rem' }
    },

    //'Search' button
    button: {
        width: '6rem',
        padding: '0.45rem 0.75rem',
        borderRadius: '2rem',
        border: 'none',
        background: 'linear-gradient(to right, #2BB282 0%, #2D73EA 115%)',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.95rem',
        letterSpacing: '-0.04rem',
        color: '#ECEBE5',
        cursor: 'pointer',
        '&:hover, &:focus': { outline: 'none' }
    }
});

export default styles;