const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    expPage: {
        position: 'relative',
        marginTop: '12vh',
        width: '100vw',
        padding: '2% 12%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'scroll',
        backgroundColor: '#151515',
        [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
    },
    extraInfo: {
        width: 'auto',
        margin: '0 auto 12vh 3rem',
        color: '#FFF',
        letterSpacing: '-0.05rem',
        fontSize: '1.1rem',
        '& h4': { 
            marginBottom: 0,
            fontSize: '1.25rem'
        },
        '& li': { 
            margin: '5px 0',
            '&.creatorIds': {
                display: 'inline-flex',
                alignItems: 'center',
                '& img': {
                    height: 150,
                    width: 'auto',
                    marginLeft: 15
                }
            } 
        },
    },

    goBackBtn: {
        position: 'absolute',
        top: 25, left: 25,
        color: 'whitesmoke',
        backgroundColor: '#656565',
        '&:hover': { backgroundColor: '#656565' },
        '& svg': { fontSize: '2.1rem' }
    },
    footer: {
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        padding: '0.65rem 2rem',
        display: 'flex',
        height: '5vh',
        justifyContent: 'center',
        marginLeft: -20,
        backgroundColor: '#242424',
        zIndex: 5,
        '& button': {
            fontWeight: 'bold',
            '&:first-child': {
                marginRight: 20
            }
        }
    }
});
export default styles;