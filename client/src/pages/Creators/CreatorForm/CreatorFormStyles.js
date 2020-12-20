const styles = () => ({
    root: {
        margin: '15vh auto 5vh 80px',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },

    header: {
        font: 'inherit',
        display: 'flex',
        marginBottom: '4rem',
        '& .gradient': {
            backgroundColor: '#f6d327',
            backgroundImage: 'linear-gradient(315deg, #f6d327 0%, #de4daa 74%)',
            padding: 5,
            marginRight: 16,
            borderRadius: '1.5rem'
        },
        '& $title': { margin: '4px 0' },
        '& $subtitle': { fontSize: '1.3rem' }
    },

    //Titles
    title: { 
        color: '#FFF',
        fontSize: '1.9rem',
        margin: 0
    },
    subtitle: {
        color: '#ECEBE5',
        fontSize: '1.2rem',
        margin: 0
    },

    photoField: {
        width: '60vw',
        minWidth: 370,
        marginBottom: '3rem',
        '& $dropzoneImg': {
            borderRadius: '100%',
            height: 200,
            width: 200,
            margin: '0 auto',
            '& img': {
                width: 200,
                height: 'auto',
                maxHeight: 200,
                borderRadius: '100%'
            },
            '& $deleteIcon': { 
                bottom: 5,
                top: 'unset',
                right: 'unset'
            }
        }
    },

    aboutField: {
        marginBottom: '5rem',
        '& .MuiInputBase-root': {
            maxWidth: 600,
            position: 'relative'
        },
        '& .MuiInputAdornment-positionEnd': {
            margin: 0,
            position: 'absolute',
            bottom: 27, right: 15 
        }
    },

    phoneField: {
        marginBottom: '5rem',
        '& $subtitle': { marginBottom: '1rem' },
        '& .MuiInputBase-root': { width: 300 },
    },

    idTips: { margin: '2rem 0' },
    dropzone: {
        display: 'flex',
        width: '40vw',
        minWidth: 370,
        height: 180,
        justifyContent: 'space-between'
    },
    dropzoneItem: {
        display: 'flex',
        flexDirection: 'column',
        width: '47%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemsDetails: {
        color: '#CDCDCD',
        letterSpacing: '-0.05rem',
        fontSize: '0.85rem',
        textAlign: 'center',
        margin: '0 auto 1rem',
        height: '20%',
        fontWeight: 400,
        '& p': { margin: '0 auto' },
        '& p:first-child': { 
            fontWeight: 'bold',
            textTransform: 'capitalize'
        }
    },
    dropzoneImg: {
        borderRadius: '1rem',
        backgroundColor: '#222',
        width: '100%',
        height: '80%',
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
    addIcon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .msg': { 
            color: 'grey',
            margin: 0,
            textAlign: 'center'
        },
        '& .icon': {
            fontSize: '3rem',
            color: 'grey'
        },
        '&:hover .icon, &:hover .msg': { 
            color: '#CDCDCD',
            transform: 'scale(1.04)',
            transition: 'transform 300ms ease-in-out'
        }
    },
    deleteIcon: {
        position: 'absolute',
        top: 5, right: 5,
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: 'all 200ms ease-in-out',
        '&:hover': { color: '#FFF' }
    },

    doneButton: {
        border: 'none',
        borderRadius: '1.7rem',
        fontSize: '1.05rem',
        font: 'inherit',
        letterSpacing: '-0.02rem',
        padding: '12px 22px',
        color: '#FFF',
        width: 120,
        textAlign: 'center',
        cursor: 'pointer',
        float: 'right',
        margin: '1.5rem 1.8rem 1.5rem 0',
        whiteSpace: 'nowrap',
        '&:focus': { outline: 'none' },
        '&:disabled': {
            filter: 'brightness(70%)',
            cursor: 'not-allowed'
        }
    },
    doLaterButton: {
        backgroundColor: 'transparent',
    },
    submitButton: {
        background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)'
    }
});

export default styles;