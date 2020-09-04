const styles = () => ({
    paper: {
        backgroundColor: '#161616',
        borderRadius: '1.1rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 24px 5px',

        '& .header-title': {
            fontSize: '1.2rem',
            color: '#FFF',
            margin: 0
        },

        '& .close-icon': {
            cursor: 'pointer',
            color: '#CCC'
        }
    },

    content: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },

    button: {
        cursor: 'pointer',
        backgroundColor: '#2A2A2A',
        color: '#CCC', 
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        fontSize: '0.9rem',
        border: 'none',
        width: '46%',
        height: 45,
        margin: '10px 0',
        borderRadius: '0.6rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:focus': { outline: 'none' },

        '& img': {
            width: 27, height: 27,
            marginRight: 5
        }
    },

    shareLink: {
        width: '100%',
        justifyContent: 'flex-start',
        cursor: 'default',

        '& span': {
            maxWidth: 'calc(70% - 0.8rem)',
            overflowX: 'hidden',
            fontWeight: 400,
            marginLeft: '0.8rem'
        },

        '& button': {
            border: 'none',
            backgroundColor: '#656565',
            color: '#FFF',
            borderRadius: '0.6rem',
            height: '80%',
            width: '22%',
            marginLeft: '3%',
            minWidth: 75,
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '-0.04rem',
            fontSize: '0.85rem',
            cursor: 'pointer',
            '&:focus': { outline: 'none' },
        }
    }
});
export default styles;