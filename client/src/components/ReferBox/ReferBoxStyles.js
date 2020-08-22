const styles = () => ({
    //Containers
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '0.6rem 0',
        backgroundColor: '#FFFFF9',
        borderRadius: '1rem'
    },
    root: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        padding: '15px 15px 18px',
        display: 'flex',
        flexDirection: 'column',
    },
    body: {
        display: 'flex',
        alignItems: 'flex-end', 
        justifyContent: 'space-between',
        marginTop: '0.5rem'
    },

    //Text
    title1: {
        color: '#2B2B2B',
        margin: 0,
        fontSize: '1.4rem',
        whiteSpace: 'break-spaces',
        '& span': { fontSize: '1.75rem' }
    },
    title2: {
        margin: '0 auto 8px 0',
        color: '#878788',
        fontSize: '1.4rem'
    },
    promoCode: {
        margin: 0,
        fontSize: '1rem'
    },

    referAvatars: {
        backgroundColor: '#E1E2E2',
        display: 'flex',
        borderRadius: '0.8rem',
        padding: '18px',
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
        '& img': { 
            width: 35,
            height: 35,
            marginRight: 8
        },
        '& button': {'&:focus': { outline: 'none' }}
    }
});
export default styles;