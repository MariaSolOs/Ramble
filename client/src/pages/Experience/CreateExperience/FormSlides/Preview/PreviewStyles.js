const styles = () => ({
    //General text
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '0.5rem',
        color: '#FFF',
        cursor: 'default' 
    },
    description: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '1rem',
        color: '#CDCDCD',
        lineHeight: 1.5,
        cursor: 'default'
    },

    //Image dropzone
    dropzone: {
        display: 'flex',
        width: '100%',
        height: 300,
        marginTop: '1rem'
    },
    dropzoneItem: {
        display: 'flex',
        flexDirection: 'column',
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemsDetails: {
        color: '#CDCDCD',
        letterSpacing: '-0.05rem',
        fontSize: '0.85rem',
        textAlign: 'center',
        margin: '0 auto 10px',
        minHeight: '20%',
        width: '88%',
        '& p': { margin: '0 auto' },
        '& p:first-child': { //Only make title bold
            fontWeight: 'bold'
        }
    },
    dropzoneImg: {
        borderRadius: '1rem',
        backgroundColor: '#2F2E2E',
        width: '90%',
        maxHeight: '80%',
        minHeight: '80%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            maxWidth: '95%',
            height: 'auto',
            maxHeight: '70%',
            objectFit: 'contain',
        }
    },

    //Icons
    addIcon: {
        fontSize: '3.5rem',
        color: 'grey',
        '&:hover': { 
            color: '#CDCDCD',
            transform: 'scale(1.05)',
            transition: 'transform 300ms ease-in-out'
        }
    },
    deleteIcon: {
        position: 'absolute',
        top: 5, right: 5,
        cursor: 'pointer',
        transition: 'all 200ms ease-in-out',
        '&:hover': { color: '#FFF' }
    }
});
export default styles;