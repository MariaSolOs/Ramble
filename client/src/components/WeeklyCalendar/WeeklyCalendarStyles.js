const styles = () => ({
    weekSlots: {
        display: 'flex',
        height: '100%',
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