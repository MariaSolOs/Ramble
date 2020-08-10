const styles = (theme) => ({
    slide: {
        width: '85vw',
        height: '70vh',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },

    //Title
    title: {
        fontWeight: 'bold',
        fontSize: '2.3rem',
        width: 'fit-content',
        color: '#E6E6E6',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        display: 'flex',
        position: 'absolute',
        marginTop: 0,
        top: 30,
        left: 10,
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            top: 40,
            left: 40,
            fontSize: '1.8rem'
        },

        '& .underline': {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '0.55rem',

            '& span': {
                padding: 3,
                marginTop: -2,
                borderRadius: '1rem',
                background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)'
            }
        }
    },

    //Creator cards
    bioCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '100px auto 0',
        padding: 8,
        width: '40%',
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            margin: '100px auto',
        }
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 230,
        margin: 'auto',

        '& svg': {
            color: 'grey',
            fontSize: '3rem',
            '&:hover': {    
                color: '#FFF',
                cursor: 'pointer'
            }
        },

        '& img': {
            borderRadius: '100%',
            height: 150,
            width: 150,
            alignSelf: 'center',
            [theme.breakpoints.down('sm')]: {
                height: 120,
                width: 120
            }
        }
    },
    creatorName: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.03rem',
        fontSize: '1.5rem',
        color: '#FFF',
        margin: '10px 0 -5px 0'
    },
    creatorCity: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        color: '#DCDCD6',
        margin: '0.5rem auto 0 auto',
    },
    creatorBio: {
        fontFamily: 'Futura, sans-serif',
        letterSpacing: '-0.03rem',
        color: '#CCCCC6',
        fontSize: '1rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem'
        }
    },

    //Transitions
    zoomEnter: {
        opacity: 0,
        transform: 'scale(0.5)'
    },
    zoomEnterActive: {
        opacity: 1,
        transform: 'scale(1)',
        transition: 'all 400ms ease-in'
    },
    zoomExit: {
        display: 'none'
    }
});

export default styles;