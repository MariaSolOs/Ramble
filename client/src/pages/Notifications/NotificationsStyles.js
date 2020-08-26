const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '70vh',
        width: '90%',
        margin: '13vh auto 5vh',
        '& .body': { width: '100%' }
    },
    shadowSeparator: {
        padding: 5,
        borderRadius: '2rem',
        marginRight: '3%',
        background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
    },
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        color: '#FFF'
    },

    notifList: {
        listStyle: 'none',
        padding: 0,
        marginTop: '1.5rem',
        width: 'calc(100% - 10px - 3%)'
    },
    notif: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        color: '#ECEBE5',
        fontSize: '1.15rem',
        lineHeight: 2,
        marginBottom: '1rem',
        position: 'relative',
        '&.link-notif': { cursor: 'pointer' }
    },
    notifIcon: {
        fontWeight: 'bold',
        marginRight: '1rem',
        width: 40, height: 40,
        cursor: 'default',
        '& .fa-check-circle': { fontSize: '2rem' },
        '& .fa-star': { fontSize: '1.6rem' }
    },
    deleteIcon: {
        position: 'absolute',
        top: '30%', right: 0,
        color: '#939292',
        cursor: 'pointer'
    }
});
export default styles;