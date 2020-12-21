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
        '& .brand-logo': {
            height: 48,
            width: 85
        },
        '& .brand-name': {
            height: 30,
            paddingBottom: 2,
            marginLeft: -5
        }
    }
});
export default styles;