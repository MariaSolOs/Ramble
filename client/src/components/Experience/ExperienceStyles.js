export const pageStyles = (theme) => ({
    body: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        width: '83%',
        minWidth: 320,
        maxWidth: 460,
        [theme.breakpoints.down('sm')]: { 
            width: '80%',
            margin: '0 auto'
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    online: {
        width: 70,
        color: '#2D2E2E',
        backgroundColor: 'rgba(256, 256, 256, 0.56)',
        borderRadius: 5,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.5rem',
        fontWeight: 'bold',

        '& img': {
            width: 20,
            margin: 4
        }
    },

    title: {
        fontSize: '1.6rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        margin: 0
    },

    location: {
        fontSize: '0.95rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        margin: '0.5rem 0'
    },

    categories: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 280,
        margin: '8px 0',
        '& h5': {
            fontSize: '0.85rem'
        }
    }
});

export const creatorStyles = () => ({
    label: {
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        marginBottom: 0
    },
    
    host: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.5rem 0',
        '& .creator-name': {
            fontSize: '0.9rem',
            letterSpacing: '-0.05rem',
            color: '#CBCBCB',
            margin: '0 10px'
        }
    },

    bioToggler: {
        backgroundColor: '#242424',
        borderRadius: '0.5rem',
        color: '#ECEBE5',
        font: 'inherit',
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',
        border: 'none',
        marginLeft: 15,
        padding: '0.8rem 0.9rem',
        width: 130,
        cursor: 'pointer',
        '&:focus': { outline: 'none' }
    },

    bio: { 
        display: 'flex',
        '& .bio-text': {
            fontSize: '0.97rem',
            letterSpacing: '-0.05rem',
            color: '#C8C8C8',
            lineHeight: 1.4,
            margin: '0.5rem 0'
        } 
    }
});

export const quickInfosStyles = () => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        width: props => 
            props.numSlots === 4? '95%' : '85%',
        backgroundColor: '#1C1C1C',
        borderRadius: '1rem',
        margin: '1rem 0',
        cursor: 'default',
        padding: props => `0 ${5 + 5*(props.rootPadding)}px`,
        '& > div': {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            letterSpacing: '-0.05rem',
            margin: props => 
                props.numSlots === 4? '0.7rem' : '1rem',
            '&:nth-child(3)': { //Allow languages to wrap
                whiteSpace: 'pre-line' 
            }
        }
    },
    label: {
        fontSize: '0.9rem',
        color: '#717171',
        textTransform: 'uppercase',
        marginBottom: 3,
        textAlign: 'center'
    },
    content: {
        fontSize: '1.05rem',
        color: '#DDDDDD',
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    icon: {
        backgroundColor: '#1C1C1C',
        borderRadius: '50%',
        position: 'absolute',
        top: -28,
        left: 'calc(50% - 14px)',
        padding: 5,
        '& svg': {
            color: '#717171',
            fontSize: '1.15rem',
        }
    }
});

export const descriptionStyles = () => ({
    label: {
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        margin: 0
    },
    text: {
        fontSize: '0.97rem',
        letterSpacing: '-0.05rem',
        color: '#C8C8C8',
        lineHeight: 1.4
    },
    
    itemList: {
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        color: '#C8C8C8',
        listStylePosition: 'inside',
        padding: 0,
        marginTop: '0.5rem',
        textTransform: 'capitalize',
        '& li': {
            padding: '0.2rem 0'
        }
    }
});

export const mapStyles = () => ({
    label: {
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        margin: '10px 0'
    },
    
    wrapper: {
        '& .mapboxgl-map': {
            borderRadius: '1.7rem'
        },
        '& div > *': { cursor: 'default' }
    },

    marker: {
        backgroundColor: 'rgba(197, 197, 197, 0.4)',
        width: 40, height: 40,
        borderRadius: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > div': {
            backgroundColor: '#FFF' ,
            width: 15, height: 15,
            borderRadius: '100%'
        }
    }
});