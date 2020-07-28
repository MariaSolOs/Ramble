const styles = (theme) => ({
    root: {
        borderRadius: '1.5rem',
        display: 'inline-block',
        overflow: 'hidden',
        width: '21%',
        minWidth: 170,
        height: 300,
        position: 'relative',
        margin: '0 1.35rem 1.35rem 0',
        '&:hover': {
            transform: 'scale(1.03)',
            transition: 'transform 0.5s'
        }
    },

    //Save button
    saveButton: {
        position: 'absolute',
        top: 10, right: 10,
        height: 36, width: 36,
        backgroundColor: 'rgba(256, 256, 256, 0.56)',
        '& svg': {
            //Heart color: red is exp is saved, white if not
            color: props => props.saved? '#FE4164' : '#FFF',
            fontSize: '1.25rem'
        }
    },

     //Tooltip
     tooltip: {
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontWeight: 'bold',
        fontSize: 11,
        whiteSpace: 'nowrap',
    },
    tooltip_top: { 
        position: 'absolute',
        right: -50,
        top: -50
    },

    card: {
        cursor: 'default',
        flexShrink: 0,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        '& img': {
            width: '100%',
            height: '62%',
            objectFit: 'cover'
        }
    },

    //Card content
    body: {
        backgroundColor: '#2D2E2E',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.02rem',
        color: '#ECEBE5',
        height: '38%',
        minHeight: 100,
        marginTop: -5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10px 10px',
        boxSizing: 'border-box',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '0.9rem',
        margin: '5px auto 4px 0',
        textAlign: 'left',
        overflowWrap: 'break-word'
    },
    location: {
        margin: '0 auto 7px 0',
        fontSize: '0.8rem',
    },
    rating: {
        margin: 0,
        fontSize: '0.75rem',
        fontWeight: 'bold',
        display: 'inline-flex',
        alignItems: 'center',
        '& svg': { 
            width: '1rem',
            height: '1rem',
            marginLeft: 5
        }
    },
    price: {
        alignSelf: 'flex-end',
        fontSize: '0.7rem',
        margin: '-10px 0 0',
        fontWeight: 'bold',
        '& span': {
            fontSize: '1.1rem',
            letterSpacing: '-0.02rem'
        }
    }
});

export default styles;