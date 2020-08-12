const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '70vh',
        width: '90%',
        margin: '12vh auto 5vh'
    },
    shadowSeparator: {
        padding: 5,
        borderRadius: '2rem',
        marginRight: '3%',
        background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
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
        position: 'relative'
    },
    notifIcon: {
        fontWeight: 'bold',
        marginRight: '1rem',
        width: 50, height: 50,
        cursor: 'default'
    },
    deleteIcon: {
        position: 'absolute',
        top: '30%', right: 0,
        color: '#939292',
        cursor: 'pointer'
    }
});
export default styles;