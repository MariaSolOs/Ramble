const styles = () => ({
    root: {
        width: '100%',
        height: '100%',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },

    title: {
        marginBottom: 10,
        color: '#FFF',
        fontSize: '1.6rem'
    },
    greyText: {
        fontSize: '0.95rem',
        color: '#737373'
    },

    savedCards: {
        listStyle: 'none',
        padding: 0,
        fontSize: '1.3rem',
        
        '& li': {
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 10,
            width: '70%',
            minWidth: 400,
            '& $greyText': { marginLeft: '1rem' },
            '& .credit-card-icon': { fontSize: '3rem' },
            '& .bullets': { margin: '0 7px' }
        }
    },
    removeIcon: {
        marginLeft: 'auto',
        cursor: 'pointer',
        transition: 'all 300ms ease-in-out',
        color: '#737373',
        '&:hover': { color: '#FFF' }
    },

    addPaymentMethod: {
        width: '65%',
        minWidth: 400,
        marginTop: '5vh',
        '& $title': {
            marginBottom: 0,
            color: '#FFF',
            fontSize: '1.3rem'
        }, 
        '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginLeft: 10, 
            '& > div': { width: '85%' }
        }
    },
    addIcon: {
        fontSize: '2.8rem',
        color: 'grey',
        float: 'right',
        '&:hover': { 
            color: '#CDCDCD',
            transform: 'scale(1.05)',
            transition: 'transform 300ms ease-in-out'
        }
    },
    errorMessage: { color: '#D8246E' }
});
export default styles;