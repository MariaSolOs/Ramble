const styles = () => ({
    root: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        width: '35%',
        minWidth: 400,
        '& p': { margin: 0 }
    },

    greyText: { 
        color: '#ACACAC',
        fontSize: '0.95rem'
    },
    whiteText: { 
        color: '#FFF',
        fontSize: '1rem' 
    },
    withLargeNum: {
        fontSize: '0.9rem',
        '& span': {
            fontSize: '1.1rem',
            marginRight: 3
        }
    },

    header: {
        padding: '1rem 5px 1.5rem',
        '& $whiteText': {
            margin: '5px 0',
            fontSize: '1.25rem'
        }
    },
    body: {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 1.4rem 1.3rem',

        '& > .row': { margin: '10px 0' },

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

    clientInfo: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 0 10px -5px',
        '& .MuiAvatar-root': { 
            marginRight: 10,
            width: 50, height: 50,
        },
        '& $whiteText': { fontSize: '1.25rem' }
    },
    bookDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        whiteSpace: 'nowrap'
    },
    experience: {
        display: 'flex',
        margin: '1.2rem 0',
        '& img': {
            borderRadius: '0.8rem',
            height: 110,
            objectFit: 'contain',
            marginRight: 10
        },
        '& h4': { 
            marginTop: 8,
            fontSize: '1.2rem' 
        }
    },
    currentBookInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
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
        backgroundImage: 'linear-gradient(315deg, #08E1AE 0%, #98DE5B 74%)',
        marginRight: '1.5rem'
    },
    declineButton: {
        backgroundColor: '#990000',
        backgroundImage: 'linear-gradient(147deg, #990000 0%, #FF0000 74%)'
    }
});
export default styles;