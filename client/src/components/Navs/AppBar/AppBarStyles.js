const styles = () => ({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        opacity: 1,
        transition: 'opacity 0.6s',
        padding: '0.7rem 1.1% 0 1.1%',

        '& a': { //Get rid of blue underline
            textDecoration: 'none',
            '&:hover': { textDecoration: 'none' }
        },

        '&.scrolled': {
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 600ms'
        }
    },

    //Ramble logo
    brand: {
        alignContent: 'bottom',
        cursor: 'pointer',
        '& img': {
            height: 48,
            width: 85,
            paddingBottom: 2
        },
        '& span': {
            fontFamily: 'Futura',
            fontSize: '1.813rem',
            letterSpacing: '-0.05rem',
            color: '#F6F6F6',
            verticalAlign: 'bottom',
        }
    }
});
export default styles;