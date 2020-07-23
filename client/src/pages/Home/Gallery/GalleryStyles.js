const styles = (theme) => ({
    //Containers
    root: {
        height: '100%',
        width: '85%',
        margin: '5% auto 10%',
        display: 'flex',
        justifyContent: 'space-around',
    },
    body: {
        display: 'flex',
        flexDirection: 'column'
    },
    
    //Text styles
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.5rem',
        letterSpacing: '-0.09rem',
        color: '#FFF',
        marginBottom: '0.4rem'
    },
    description: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        letterSpacing: '-0.07rem',
        color: '#E5E4E5',
        margin: '0 0 2rem'
    },

    images: {
        display: 'flex',
        marginTop: '2rem',
        justifyContent: 'space-between',
        width: 840,
        margin: '0 auto',
        '& img': {
            width: 250,
            height: 350,
            borderRadius: '1.3rem',
            [theme.breakpoints.down('xs')]: { 
                width: 'auto',
                marginBottom: '0.5rem' 
            },
        },
        [theme.breakpoints.down('xs')]: { 
            flexDirection: 'column',
            width: '90%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center' 
        }
    }
});
export default styles;

