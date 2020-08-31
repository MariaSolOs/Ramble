const styles = () => ({
    root: { 
        width: '90%',
        margin: '100px auto 50px',
        color: '#FFF',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },
    reviews: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        margin: '0 auto'
    },
    review: {
        width: '40%',
        marginRight: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .exp-title': {
            fontSize: '1.5rem',
            margin: '0 0 8px'
        },
        '& .exp-img': {
            height: 300,
            width: 'auto',
            margin: '0 auto'
        }
    }
});
export default styles;