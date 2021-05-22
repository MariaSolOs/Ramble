import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    slide: {
        minHeight: 'calc(100vh - 100px)',
        marginTop: 100,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        maxWidth: '100vw'
    },

    slideContent: {
        margin: '0 auto',
        display: 'flex',
        width: '80%',
        justifyContent: 'space-around',

        [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
        [theme.breakpoints.down('xs')]: { width: '90%' }
    },

    title: {
        fontSize: '2.6rem',
        margin: 0,
        
        [theme.breakpoints.down('md')]: { fontSize: '2.4rem' },
        [theme.breakpoints.down('xs')]: { 
            fontSize: '2rem',
            whiteSpace: 'break-spaces'
        }
    },

    subtitle: {
        color: '#E5E4E5',
        fontSize: '1.2rem',
        margin: '0 0 1.8rem',
        
        [theme.breakpoints.down('md')]: { 
            fontSize: '1.1rem',
            whiteSpace: 'break-spaces'
        }
    },

    searchBody: {
        display: 'flex',
        flexDirection: 'column',
        width: '37%',
        whiteSpace: 'nowrap',
        justifyContent: 'center',

        [theme.breakpoints.down('md')]: { width: '45%' },
        [theme.breakpoints.down('sm')]: { 
            width: '90%',
            margin: '0 auto' 
        }
    },

    searchBodyRow: {
        width: '100%',
        margin: '0 0 20px',
        display: 'flex'
    },

    imageContainer: {
        width: '45%',
        height: 500,
        display: 'flex',
        alignItems: 'center',
        
        [theme.breakpoints.down('md')]: { maxWidth: 400 },
        [theme.breakpoints.down('sm')]: { display: 'none' }
    },
    
    image: {
        borderRadius: '2rem',
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'contain',

        [theme.breakpoints.down('sm')]: { 
            margin: '0 auto',
        }
    },

    peopleInput: {
        width: '47%',
        marginRight: '3%',

        [theme.breakpoints.down('xs')]: { 
            width: '57%',
            marginRight: '3%'
        }
    },

    searchButton: {
        width: '50%',
        background: 'linear-gradient(to right, #2BB282 0%, #2D73EA 50%, #2BB282 90%)',
        backgroundSize: '200% auto',
        transition: 'all 400ms ease-in-out',

        '&:hover': { backgroundPosition: 'right center' },

        [theme.breakpoints.down('xs')]: { 
            width: '40%'
        }
    }
});

export default styles;
