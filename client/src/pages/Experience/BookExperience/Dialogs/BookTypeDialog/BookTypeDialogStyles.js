const styles = () => ({
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '0 0 0 10px',
        font: 'inherit',
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
    },

    expWrapper: {
        width: '70%',
        margin: '0 0 1.5rem 0.5rem',
    },

    //Booking buttons
    bookButton: {
        borderRadius: '1rem',
        width: '100%',
        height: 96,
        marginBottom: '0.5rem',
        boxSizing: 'border-box',
        border: 'none',
        padding: 12,
        textAlign: 'left',
        color: '#ECEBE5', 
        cursor: 'pointer',
        backgroundColor: '#2A2A2A',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        position: 'relative',
        transition: 'all 200ms ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        '& p': {
            color: '#C8C8C8',
            fontSize: '0.95rem',
            margin: 0
        },
        '&.selected': {
            backgroundColor: '#ECEBE5',
            '& $bookTitle, & $bookPrice, & $bookPrice span, & $bookPrice::first-letter': { 
                color: '#2B2B2B' 
            },
            '& p, & $bookCapacity': { 
                color: '#9A9A9A'
            }
        },
        '&.private': { margin: '1rem 0 0' },
        '&:focus': { outline: 'none' }
    },
    bookTitle: {
        color: '#FFF',
        margin: 0,
        fontSize: '1.3rem'
    },
    bookCapacity: {
        display: 'flex',
        margin: '10px auto 5px 4px',
        color: '#C8C8C8',
        '& svg': {
            marginRight: 5,
            fontSize: '1rem'
        },
        '& p': { fontSize: '0.8rem' }
    },
    bookPrice: {
        textTransform: 'uppercase',
        color: '#C8C8C8',
        '& svg': { color: '#C8C8C8' },
        fontSize: '0.9rem',
        position: 'absolute',
        top: 12, right: 16,
        '&:first-letter': {
            color: '#FFF',
            fontSize: '1rem',
        },
        '& span': { //Numerical price
            fontSize: '1.3rem',
            color: '#FFF'
        }
    },
    
    numGuests: {
        width: '90%',
        margin: '0.5rem auto 1.5rem',
        '& .input': {
            display: 'flex',
            width: '45%',
        },
        '& .text': {
            margin: '0 0 10px',
            color: '#C8C8C8',
            font: 'inherit',
            fontSize: '0.9rem'
        },
        '&.private': { margin: '0.5rem auto 0.5rem' }
    }
});
export default styles;