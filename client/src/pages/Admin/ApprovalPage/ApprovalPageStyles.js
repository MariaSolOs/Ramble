const styles = (theme) => ({
    root: {
        position: 'relative',
        margin: '12vh 0 10vh',
        width: '100vw',
        padding: '2% 15% 2% 15%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'scroll',
        backgroundColor: '#151515',
        [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
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
        '& button': {
            fontWeight: 'bold',
            '&:first-child': {
                marginRight: 20
            }
        }
    }
});
export default styles;