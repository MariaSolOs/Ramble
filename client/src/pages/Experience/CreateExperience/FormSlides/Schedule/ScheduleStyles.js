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
        fontSize: '1.05rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '0.5rem',
        color: '#CDCDCD',
        cursor: 'default',
    },
    tips: {
        margin: '1rem 0',
        '& p': { 
            margin: '0 0 9px 0'
        }
    },

    //For the weekslots table
    weekSlots: {
        display: 'flex',
        marginBottom: '10%',
        '& ul': {
            listStyle: 'none',
            padding: 0,
            margin: 0,
            height: 0,
        },
        '& button': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '-0.05rem',
            width: 110,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            padding: '15px 10px',
            margin: 4,
            border: 'none',
            borderRadius: '0.77rem',
            fontSize: '0.7rem',
            textAlign: 'center',
            transition: 'background-color 400ms ease-in-out',
            '&.day-button': { fontSize: '0.9rem' },
            //Make numbers larger
            '& span': { 
                fontSize: '0.88rem',
                marginRight: 3 
            },
            '&:focus': { outline: 'none' },
        }
    },
    selectedButton: {
        backgroundColor: '#ECEBE5',
        color: '#2B2B2B'
    },
    unselectedButton: {
        color: '#ECEBE5', 
        backgroundColor: '#2A2A2A'
    }
});
export default styles;