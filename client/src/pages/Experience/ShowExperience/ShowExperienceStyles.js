const styles = (theme) => ({
    //Container
    root: {
        position: 'relative',
        margin: '12vh 0 0',
        height: '84vh',
        width: '100vw',
        boxSizing: 'border-box',
        padding: '2vh 12% 2vh 9%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#151515',
        [theme.breakpoints.down('sm')]: { 
            flexDirection: 'column',
            padding: '2% 10% 2% 10%',
            boxSizing: 'border-box',
            overflowY: 'scroll'
        },

        '& .image-gallery-slide .image-gallery-image': {
            maxHeight: '70vh !important'
        },

        '& .image-gallery': {
            position: 'sticky',
            minWidth: '45%',
            maxWidth: 490,
            maxHeight: '80vh',
            [theme.breakpoints.down('sm')]: { 
                marginBottom: '4vh',
                '& .image-gallery-image': {
                    height: 400
                }
            }
        }
    },

    experienceWrapper: {
        overflowY: 'scroll',
        marginBottom: 90,
        [theme.breakpoints.down('sm')]: { 
            overflowY: 'unset',
        }
    },

    shareDialog: {
        '& .MuiDialog-paper': { borderRadius: '1rem' }
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
        height: 'auto',
        maxHeight: 60,
        zIndex: 5,
        fontFamily: 'Helvetica, sans-serif',
        backgroundColor: '#1C1C1C', 
        '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 'calc(100vw - 24% - 45%)',
            margin: '0 15% 0 auto',
            [theme.breakpoints.down('sm')]: { 
                width: '80%',
                margin: '0 auto',
                justifyContent: 'space-around'
            }
        }
    },

    price: {
        margin: 0,
        color: '#BFBFBF',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        letterSpacing: '-0.03rem',
        '& span': {
            color: '#FFF',
            fontSize: '1.5rem',
            display: 'inline-block',
            margin: '0 3px',
            '&:first-letter': { fontSize: '1rem' }
        }
    },
    
    bookButton: {
        height: '3rem',
        width: '8.5rem',
        borderRadius: '0.5rem',
        color: '#ECEBE5',
        background: 'linear-gradient(to right, #2BB282 0%, #2D73EA 50%, #2BB282 90%)',
        fontSize: '1rem',
        padding: '0 10px',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        lineHeight: 0.92,
        border: 'none',
        cursor: 'pointer',
        backgroundSize: '200% auto',
        transition: 'all 300ms ease-in-out',
        '&:focus': { outline: 'none' },
        '&:hover': { backgroundPosition: 'right center' }
    }
});
export default styles;