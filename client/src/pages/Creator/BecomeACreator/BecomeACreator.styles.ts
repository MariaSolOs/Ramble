import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    landingSlide: {
        margin: '100px auto 0',
        boxSizing: 'border-box',
        display: 'flex',
        width: 'fit-content',
        alignItems: 'center'
    },

    title: {
        color: '#E6E6E6',
        letterSpacing: '-0.05rem',
        margin: 0,
        fontSize: '2.3rem',
        [theme.breakpoints.down('sm')]: { fontSize: '1.8rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    landingImg: {
        height: 480,
        borderRadius: '2rem',
        marginLeft: 70,
        [theme.breakpoints.down('sm')]: { 
            height: 350,
            marginLeft: 40 
        },
        [theme.breakpoints.down('xs')]: {
            width: '48vw',
            height: 'auto',
            marginLeft: '2vw',
            borderRadius: '0.8rem'
        }
    },

    getStartedButton: {
        padding: '10px 20px',
        marginTop: '2rem',
        width: 130,
        fontSize: '1.05rem',
        [theme.breakpoints.down('xs')]: {
            width: 100,
            fontSize: '0.8rem',
            padding: '0.45rem 0.75rem',
            marginTop: '1.5rem'
        }
    }
});

export default styles;