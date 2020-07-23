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

    flexCol: { 
        display: 'flex',
        flexDirection: 'column' 
    },
    //For each setting option
    settingField: {
        display: 'flex',
        margin: '1% 0 2%',
        '& .checkbox': { 
            width: '6%',
            minWidth: 42,
            marginTop: -5 
        },
        '& .content': { 
            width: '90%',
            '& $description': { 
                fontSize: '1rem',
                marginBottom: '0.5rem' 
            },
            '& $title': { 
                fontSize: '1.7rem',
                marginBottom: 0
            },
            '& .iconRow': { display: 'flex' }
        }
    },

    //Chips with setting examples
    iconBox: {
        display: 'flex',
        whiteSpace: 'nowrap',
        width: 140,
        marginRight: '2rem',
        alignItems: 'center',
    },
    iconLabel: {
        fontSize: '0.85rem',
        margin: '0 0.5rem 0',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        color: '#CDCDCD',
        cursor: 'default'
    }
});
export default styles;