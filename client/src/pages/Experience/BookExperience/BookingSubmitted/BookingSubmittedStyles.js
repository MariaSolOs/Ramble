const styles = (theme) => ({
    root: {
        width: '100vw',
        height: '85vh',
        margin: '15vh 0 0',
        backgroundColor: '#151515',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },

    //General text styles
    white: { 
        color: '#FFF',
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: { fontSize: '1.8rem' }
    },
    grey: { color: '#CCCCCE' },

    header: {
        width: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        padding: '1.5rem 0 0 5%',
        '& .header-gradient': {
            padding: 5,
            background: 'linear-gradient(to bottom, #2BB282 0%, #2D73EA 100%)',
            borderRadius: '3rem',
            marginRight: '1rem'
        },
        '& $white': { 
            fontSize: '1.8rem',
            margin: '3px 0 0' 
        },
        '& $grey': { 
            margin: '5px 0 4px',
            fontSize: '1.3rem' 
        }
    },

    body: {
        display: 'flex',
        width: '90%',
        margin: '3vh auto 0',
        height: 'calc(100% - 100px - 13vh)',
        [theme.breakpoints.down('xs')]: { 
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto'
        },
        '& .exp-img': {
            width: 'auto',
            minWidth: 280,
            height: '100%',
            maxHeight: 450,
            borderRadius: '2rem',
            marginLeft: '3%'
        }
    },
    description: {
        width: '50%',
        marginLeft: '5%',
        height: '90%',
        //Experience title
        '& $white': { margin: '5px 0 10px' },
        //Section titles
        '& $grey': { 
            fontSize: '1.4rem',
            margin: '25px 0 10px'
        },
        //Scroll styles
        '& .rcs-custom-scroll .rcs-custom-scrollbar': {
            opacity: 1,
        },
        '& .rcs-inner-handle': {
            background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
        },
        [theme.breakpoints.down('xs')]: { 
            width: '90%',
            marginTop: 20
        },
    },

    bookDetails: {
        '& $grey': { 
            fontSize: '1.1rem',
            margin: '0 0 8px'
        },
        '& .num-guests': {
            display: 'flex',
            '& .fa-users': {
                color: '#CCCCCE',
                fontSize: '1.2rem',
                marginRight: 10
            }
        }
    },

    host: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiAvatar-root': {
            width: 48, height: 48,
            marginRight: 10
        },
        '& $grey': {
            fontSize: '1.1rem',
            margin: 0
        },
        '& .fa-phone-alt': {
            color: '#CCCCCE',
            fontSize: '1.2rem',
            margin: '0 0.6rem 0 1.2rem'
        }
    },

    toBring: {
        paddingLeft: 25,
        margin: '0 0 2rem',
        '& $grey': { 
            fontSize: '1.25rem',
            margin: '0 0 8px',
            textTransform: 'capitalize',
        } 
    },

    meetPoint: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '50%',
        margin: '1rem 0 2rem',
        '& .fa-map-marker-alt, & .fa-laptop': {
            color: '#CCCCCE',
            fontSize: '1.7rem',
            marginRight: 10
        },
        '& $grey': { 
            fontSize: '1.1rem',
            margin: 0 
        }
    },

    payDetails: {
        '& .row': { 
            display: 'flex',
            width: '90%',
            justifyContent: 'space-between',
            paddingLeft: 5
        },
        '& .pay-method': {
            color: '#CCCCCE',
            fontWeight: 400,
            fontSize: '0.9rem',
            marginTop: 30
        },
    },
    cardInfo: {
        display: 'flex',
        alignItems: 'center',
        color: '#FFF',
        paddingLeft: 5,
        fontSize: '1.2rem',
        '& .bullets': {
            margin: '0 10px',
            fontSize: '1.5rem'
        },
        '& .credit-card-icon': {
            color: '#FFF',
            fontSize: '2.2rem'
        }
    },
    calculation: {
        color: '#CCCCCE',
        fontSize: '1.2rem',
        margin: '30px 0',
        '& span': { fontSize: '0.95rem' },
        '& p:nth-of-type(2)': { fontWeight: 400 }
    },
    total: {
        fontSize: '1.4rem',
        color: '#FFF',
        marginBottom: '1rem',
        '& p': { margin: 0 },
        '& span': { color: '#CCCCCE' }
    },

    footer: {
        width: '90%',
        height: '9vh',
        marginTop: '1vh',
        '& button': {
            width: 110,
            float: 'right',
            padding: '0.7rem 0',
            borderRadius: '2rem',
            border: 'none',
            background: 'linear-gradient(to right, #2BB282 0%, #2D73EA 100%)',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            letterSpacing: '-0.04rem',
            color: '#ECEBE5',
            cursor: 'pointer',
            '&:focus': { outline: 'none' },
        }
    }
});
export default styles;