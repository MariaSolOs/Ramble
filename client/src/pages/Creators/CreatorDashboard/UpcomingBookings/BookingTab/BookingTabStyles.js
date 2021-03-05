const styles = (theme) => ({
    root: {
        borderRadius: '1.5rem',
        width: 350,
        backgroundColor: '#2D2E2E',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        position: 'relative'
    },

    privateTab: {
        backgroundColor: '#FFF',
        padding: '0.4rem',
        display: 'flex',
        fontSize: '0.85rem',
        position: 'absolute',
        top: 10, right: 10,
        borderRadius: 10,

        '& svg': {
            marginRight: 5
        }
    },

    greyText: { 
        color: '#ACACAC',
        margin: 0,
        fontSize: '0.95rem',

        '&.large-num': { fontSize: '1.2rem' }
    },
    whiteText: { 
        color: '#FFF',
        fontSize: '1.2rem',
        margin: '10px 0'
    },

    clientPic: {
        height: 50,
        width: 50,
        marginRight: '1rem'
    }
});

export default styles;