const styles = () => ({
    paper: {
        backgroundColor: '#151515',
        borderRadius: '1.1rem',
        padding: '1rem 0.7rem',
    },

    header: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '0 0 0 10px',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        '& .goBackIcon': {
            float: 'left',
            color: '#FFF',
            fontSize: '2.5rem',
            marginLeft: -10,
            cursor: 'pointer',
            display: 'block',
        },
        '& .title': {
            margin: '1rem auto 1rem 0',
            fontSize: '1.4rem',
            color: '#FFF',
        },
        '& .date': {
            fontSize: '1.2rem',
            color: '#ECEBE5',
            margin: 0,
            '& span': { 
                fontSize: '0.95rem',
                marginLeft: 10
            }
        },
    },

    //Timeslots
    timeTable: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        minWidth: 380,
        flexWrap: 'wrap',
        margin: '1.5rem 0',
        padding: 0
    },
    timeslot: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0.6rem',
        width: '48%',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        border: 'none',
        padding: 12,
        marginBottom: '1.4rem',
        color: '#ECEBE5', 
        backgroundColor: '#2A2A2A',
        '&.selected': {
            backgroundColor: '#ECEBE5',
            color: '#2B2B2B'
        },
        '&.disabled': {
            filter: 'brightness(70%)',
            cursor: 'not-allowed'
        },
        '& > div': { //Rows
            display: 'flex',
            maxWidth: '100%',
            '&:first-child': { marginBottom: '1.5rem' }
        },
        '& svg': { 
            fontSize: '1.1rem',
            '&$disabledIcon': { fontSize: '1.4rem' } 
        },
        '&:focus': { outline: 'none' }
    },

    //Timeslot text
    time: {
        fontSize: '1.05rem',
        fontWeight: 'bold',
        margin: '0 0 0 10px',
        '& span': { 
            fontSize: '0.75rem',
            marginLeft: 4 
        }
    },
    bookingMsg: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        margin: '4px 0 0 10px',
    },
    disabledIcon: { 
        position: 'absolute',
        top: 12, right: 12,
    },

    continueButton: {
        display: 'block',
        width: '85%',
        margin: '0 auto',
        padding: '0.6rem 0.75rem',
        borderRadius: '0.4rem',
        border: 'none',
        background: 'radial-gradient(circle at -21.27%, #2BB282, #2D73EA)',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem',
        color: '#ECEBE5',
        cursor: 'pointer',
        transition: 'filter 200ms ease-in',
        '&:focus': { outline: 'none' },
        '&:hover': { outline: 'none' },
        '&.disabled': { 
            filter: 'brightness(40%)',
            cursor: 'not-allowed'
        }
    }
});
export default styles;