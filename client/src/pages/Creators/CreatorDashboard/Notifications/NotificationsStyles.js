const styles = () => ({
    notifList: {
        listStyle: 'none',
        padding: 0,
        marginTop: '3rem'
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