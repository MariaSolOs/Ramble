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
        marginBottom: '0.8rem',
        color: '#CDCDCD',
        lineHeight: 1.5,
        cursor: 'default'
    },
    greyCaps: {
        color: '#CDCDCD',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        fontSize: '1rem',
        margin: '0 1rem'
    },

    //Category boxes
    categoryDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50.2vw',
        maxWidth: 500,
        flexWrap: 'wrap',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
    },
    categoryItem: {
        display: 'inline-block',
        width: '31%',
        marginBottom: '2.6%',
        '&:hover': {
            filter: 'brightness(45%)',
            transition: '300ms ease-in-out',
            cursor: 'pointer',
        },
        '&.selected ': {
            filter: 'brightness(45%)',
        },
        '& h5': { fontSize: '1.15rem' }
    },

    tip: { marginTop: 0 }
});
export default styles;