const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '3%',
        maxHeight: 'calc(85vh - 44px - 41px - 20px)'
    },

    //General text
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        margin: 0,
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
    },

    experience: {
        position: 'relative',
        display: 'flex',
        margin: '20px 0',
        height: '90%',
        transform: 'scale(0.8) translate(-70px -50px)',
        '& .image-gallery': { position: 'sticky' },
        '& .exp-wrapper': { overflowY: 'scroll' }
    }
});
export default styles;