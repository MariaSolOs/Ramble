const styles = () => ({
    root: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        width: '45%',
        minWidth: 430,
        '& p': { margin: 0 }
    },

    //Used through the entire card
    greyText: { 
        color: '#ACACAC',
        fontSize: '0.95rem'
    },
    whiteText: { 
        color: '#FFF',
        fontSize: '1rem' 
    },
    withLargeNum: {
        fontSize: '0.85rem',
        '& span': {
            fontSize: '1.1rem',
            marginRight: 3
        }
    },

    header: {
        padding: '1rem 5px 5px',
        '& $whiteText': {
            margin: '5px 0',
            fontSize: '1.2rem'
        }
    },
    body: {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 1.4rem',
        position: 'relative',

        '& > .row': { margin: '8px 0' },

        '& .MuiFab-root': {
            backgroundColor: '#2D2E2E',
            boxShadow: 'none',
            width: 35, height: 35,
            cursor: 'default',
            '& svg': {
                color: '#ACACAC',
                fontSize: '1.1rem'
            }
        }
    },

    private: {
        position: 'absolute',
        top: '1rem', right: '1.4rem',
        color: '#FFF',
        '& svg': {
            fontSize: '1.5rem',
            display: 'block',
            margin: '0 auto 5px',
        }
    },

    clientInfo: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: -5,
        '& .MuiAvatar-root': { 
            marginRight: 10,
            width: 45, height: 45,
        },
        '& $whiteText': { fontSize: '1.25rem' }
    },
    expTitle: {
        color: '#FFF',
        fontSize: '1.25rem',
        margin: '0 0 10px'
    },
    bookDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        whiteSpace: 'nowrap'
    },
    currentBookInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1.5rem',
        '& button': {
            color: '#FFF',
            font: 'inherit',
            fontSize: '0.9rem',
            letterSpacing: '-0.05rem',
            borderRadius: '0.5rem',
            padding: '0.9rem 1.4rem',
            textAlign: 'center',
            width: '30%',
            border: 'none',
            cursor: 'pointer',
            '&:focus': { outline: 'none' }
        }
    },
    acceptButton: {
        backgroundColor: '#08E1AE',
        backgroundImage: 'linear-gradient(to right, #76B852 0%, #8DC26F 51%, #76B852 100%)',
        marginRight: '1rem',
        '&:hover': {
            backgroundPosition: 'right center'
        }
    },
    declineButton: {
        backgroundImage: 'linear-gradient(to right, #E53935 0%, #E35D5B 51%, #E53935 100%)',
        '&:hover': {
            backgroundPosition: 'right center'
        }
    }
});
export default styles;