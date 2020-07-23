const styles = (theme) => ({
    root: { 
        width: '80%',
        height: '80vh',
        margin: '0 auto 10vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    //Title
    title: {
        fontWeight: 600,
        fontSize: '2.4rem',
        width: 'fit-content',
        color: '#E6E6E6',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: { 
            fontSize: '1.8rem',
            marginTop: 80
        },

        '& div': {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '0.55rem'
        },

        '& $underline': { marginTop: -2 }
    },

    //Colored underline effect
    underline: {
        padding: 3,
        borderRadius: '1rem',
        background: 'radial-gradient(circle at 158%, #F7521E, #AC9EFF)'
    },

    graph: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        marginTop: 130,

        '& > div': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        '& $underline': {
            width: '75%',
            position: 'absolute',
            left: '12%',
            top: '17%',
        }
    },
    graphItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        width: '25%',
        color: 'grey',
        transition: 'color 0.2s ease-in-out',
        '&:hover': {
            color: '#E6E6E6',
            cursor: 'default'
        },

        '& div': {
            backgroundColor: 'whitesmoke',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            marginBottom: 10 
        },
        '& div img': {
            width: 35,
            height: 35
        },

        '& p': {
            textAlign: 'center',
            fontFamily: 'Helvetica, sans-serif',
            fontSize: '1.15rem',
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: '-0.05rem',
            marginTop: '0.4rem',
            [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' },
        }
    }
});

export default styles;