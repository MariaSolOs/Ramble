const styles = () => ({
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
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        color: '#CDCDCD',
        cursor: 'default',
        '&.header': { 
            fontSize: '1.2rem',
            marginBottom: '1rem' 
        }
    },
    greyCaps: {
        color: '#CDCDCD',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        fontSize: '1rem',
        margin: '0 1rem'
    },

    inputRow: {
        display: 'flex',
        width: '100%',
        marginTop: '1.5rem',
        '& .num-guests': {
            width: '15%',
            minWidth: 130,
            display: 'flex',
            flexDirection: 'column',
            '& $description': {
                fontSize: '1.1rem',
                margin: '40px 2rem 0 auto',
            }
        }
    },
    field: {
        width: '18%',
        marginRight: '2rem',
        minWidth: 170,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    //For textfields
    input: { 
        display: 'flex',
        width: '100%',
        '& .MuiFormControl-root': { width: '100%' },
        '& .MuiSelect-root, & .MuiInputBase-input': { 
            textAlign: 'center',
            fontSize: '1.2rem',
            paddingTop: 12,
            paddingBottom: 12,
            lineHeight: '1.1876em'
        }
    },

    select_menu: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '1rem',
        fontSize: '0.85rem',
        maxHeight: 150,
        overflowY: 'scroll',
        minWidth: '0 !important',
        width: 120,
        letterSpacing: '-0.05rem',
        marginTop: 10,
        transform: 'translateX(-120px) !important',
        '& .MuiMenuItem-root': {
            fontFamily: 'Helvetica',
            fontWeight: 'bold', 
            letterSpacing: '-0.05rem',
            justifyContent: 'center',
            padding: '4px 16px'
        }
    },

    //Bookings
    bookingField: {
        width: '90%',
        minWidth: 670,
        position: 'relative',
        '& $description': { fontSize: '0.9rem' }
    },
    bookingTitle: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        letterSpacing: '-0.05rem',
        color: '#CDCDCD',
        cursor: 'default',
        marginBottom: 0
    },
    tip: {
        marginBottom: 0
    },
    //Booking toggler
    toggle: {
        position: 'absolute',
        top: 20, right: 30,
        '& .MuiSwitch-track': { backgroundColor: '#929293' }
    },
});
export default styles;