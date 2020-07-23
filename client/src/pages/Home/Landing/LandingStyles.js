const styles = (theme) => ({
    //Containers
    root: {
        height: '100%',
        width: '80%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-around',
        [theme.breakpoints.down('sm')]: { 
            flexDirection: 'column',
            height: '100%',
            width: '90%', 
        }
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        width: '37%',
        whiteSpace: 'nowrap',
        padding: '3% 1.5% 0',
        [theme.breakpoints.down('md')]: { width: '45%' },
        [theme.breakpoints.down('sm')]: { 
            width: '90%',
            margin: '0 auto' 
        }
    },
    row: {
        margin: '0.6rem 0',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        '& .people-field, & .explore-button': {
            display: 'flex',
            width: '48%'
        }
    },

    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.6rem',
        letterSpacing: '-0.1rem',
        color: '#FFF',
        marginBottom: '0.4rem'
    },
    description: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        letterSpacing: '-0.07rem',
        color: '#E5E4E5',
        margin: '0 0 2rem'
    },

    //For textfields and searchbars
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

    //'Start exploring' button
    button: {
        width: '100%',
        padding: '0.45rem 0.75rem',
        borderRadius: '2rem',
        border: 'none',
        background: 'linear-gradient(to right, #2BB282 0%, #2D73EA 50%, #2BB282 90%)',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem',
        color: '#ECEBE5',
        cursor: 'pointer',
        backgroundSize: '200% auto',
        transition: 'all 400ms ease-in-out',
        '&:focus': { outline: 'none' },
        '&:hover': { backgroundPosition: 'right center' }
    },

    //For balloon image
    image: {
        width: '45%',
        height: 550,
        '& img': {
            height: '100%',
            width: 'auto',
            objectFit: 'contain',
            borderRadius: '2rem',
        },
        [theme.breakpoints.down('sm')]: { 
            width: '90%',
            height: 450,
            margin: '2% auto',
            display: 'flex',
            justifyContent: 'center' 
        }
    }
});
export default styles;