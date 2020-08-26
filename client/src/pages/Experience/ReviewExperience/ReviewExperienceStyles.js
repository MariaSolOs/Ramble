const styles = () => ({
    paper: {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.1rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 24px 0',
        '& .title': {
            margin: 0,
            color: '#FFF'
        },
        '& .MuiSvgIcon-root': {
            cursor: 'pointer',
            color: '#929293',
            fontSize: '1.4rem',
            '&:hover': { color: '#FFF' }
        }
    },

    label: { 
        fontSize: '0.9rem',
        color: '#FFF' 
    },

    rating: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem',
        '& $label': {
            fontSize: '1rem',
            margin: '10px 0'
        }
    },
    ratingStars: {
        color: '#FFF'
    },

    doneButton: {
        border: 'none',
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '1rem',
        fontWeight: 400,
        letterSpacing: '-0.04rem',
        color: '#FFF',
        backgroundColor: 'transparent',
        textAlign: 'center',
        cursor: 'pointer',
        float: 'right',
        margin: '15px 0 10px',
        '&:focus': { outline: 'none' },
    }
});
export default styles;