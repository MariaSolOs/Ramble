const styles = () => ({
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
        margin: '1.5rem 0 0',
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
        marginBottom: '1.1rem',
        //Switch colors on selection
        color: props => props.selected? '#2B2B2B' : '#ECEBE5',
        backgroundColor: props => props.selected? '#ECEBE5' : '#2A2A2A',
        '&:disabled': {
            filter: 'brightness(70%)',
            cursor: 'not-allowed',
            '& $time': { margin: 0 }
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
    }
});
export default styles;