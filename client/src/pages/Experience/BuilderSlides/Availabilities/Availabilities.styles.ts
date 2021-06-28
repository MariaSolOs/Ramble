import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    subtitle: {
        fontSize: '1.3rem',
        color: '#CDCDCD',
        margin: 0,

        [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '0.95rem' }
    },

    pageContainer: {
        display: 'flex',
        width: 830,
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            height: 'calc(100vh - 180px)',
            width: '95%'
        },
        [theme.breakpoints.down('sm')]: { width: '100%' }
    },

    instructions: {
        width: 400,
        marginRight: 30,

        [theme.breakpoints.down('md')]: { 
            width: '100%',
            margin: '0 0 30px'
        }
    },

    calendar: {
        '& .fc.fc-media-screen': {
            width: 420,
            [theme.breakpoints.down('xs')]: { width: '100%' }
        }
    }
});

export default styles;