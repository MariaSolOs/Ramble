const styles = () => ({
    //Containers
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '0.6rem 0',
        backgroundColor: '#FFFFF9',
        borderRadius: '1.5rem'
    },
    root: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        padding: '15px 18px',
        display: 'flex',
        flexDirection: 'column',
    },

    greyText: {
        color: '#808080',
        fontSize: '0.85rem',
        margin: 0
    },
    code: {
        background: 'linear-gradient(to right, #2D73EA 0%, #71E7DA 25%)',
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        margin: '0 0 8px'
    },

    //Header
    instruction: {
        color: '#2B2B2B',
        margin: 0,
        fontSize: '1.2rem',
        whiteSpace: 'break-spaces',
    },
    title1: {
        color: '#2B2B2B',
        margin: 0,
        fontSize: '1.4rem',
        whiteSpace: 'break-spaces',
        '& span': { fontSize: '1.75rem' }
    },
    title2: {
        margin: '0 auto 5px 0',
        color: '#878788',
        fontSize: '1.4rem'
    },

    shareOptions: {
        display: 'flex',
        marginTop: '1rem'
    },
    referAvatars: {
        backgroundColor: '#E1E2E2',
        display: 'flex',
        borderRadius: '1.2rem',
        padding: 17,
        marginRight: '10%',
        '& .MuiAvatar-root': {
            boxShadow: '10px 10px 20px -7px rgba(0, 0, 0, 0.5)',
            '&.middle-avatar': { 
                margin: '-3px -13px 0',
                zIndex: 1
            }
        },
    },
    referMedia: {
        marginRight: 20,
        display: props => !props.loggedUser && 'flex',
        alignItems: props => !props.loggedUser && 'flex-end',
        cursor: props => !props.loggedUser && 'pointer',
        '& $greyText': { marginBottom: 5 },
        '& img': { 
            width: 35,
            height: 35,
            marginRight: 8
        },
        '& button': {'&:focus': { outline: 'none' }}
    }
});
export default styles;