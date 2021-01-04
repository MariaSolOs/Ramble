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
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '1rem',
        color: '#CDCDCD',
        lineHeight: 1.5,
        cursor: 'default'
    },

    checkboxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 170,
        marginBottom: '2rem'
    },

    itemList: {
        margin: '2% 0',
        padding: 0,
        width: '50%',
        minWidth: 110,
        display: 'flex',
        flexWrap: 'wrap',
        '& .chip': {
            minWidth: '30%',
            margin: '0 2% 2% 0',
            fontSize: '1rem',
            fontFamily: 'Helvetica',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            letterSpacing: '-0.04rem',
            flexFlow: 'row-reverse',
            '& .MuiChip-deleteIcon': {
                margin: '0 -3px 0 7px',
            }
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
});
export default styles;