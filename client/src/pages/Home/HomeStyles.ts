import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (_: Theme) => createStyles({
    searchSlide: {
        marginTop: 100,
        boxSizing: 'border-box',
        height: 'calc(100vh - 164px)'
    },

    slideContent: {
        margin: '0 auto',
        display: 'flex',
        width: '80%',
        justifyContent: 'space-around'
    },

    searchBody: {
        // display: 'flex',
        // flexDirection: 'column',
        width: '37%',
        whiteSpace: 'nowrap',
        // padding: '3% 1.5% 0',
        // [theme.breakpoints.down('md')]: { width: '45%' },
        // [theme.breakpoints.down('sm')]: { 
        //     width: '90%',
        //     margin: '0 auto' 
        // }
    },

    searchBodyRow: {
        
    },

    title: {
        fontSize: '2.6rem',
        margin: 0
    },

    subtitle: {
        color: '#E5E4E5',
        fontSize: '1.2rem',
        margin: 0
    },

    imageContainer: {
        width: '45%',
        height: 550
    },
    
    image: {
        borderRadius: '2rem',
        height: '100%',
        width: 'auto',
        objectFit: 'contain',
        // [theme.breakpoints.down('sm')]: { 
            // width: '90%',
            // height: 450,
            // margin: '2% auto',
            // display: 'flex',
            // justifyContent: 'center' 
        // }
    }
});

export default styles;