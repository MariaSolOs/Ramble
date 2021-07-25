import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        margin: '2rem 0 1rem',
        height: 'calc(100% - 73px - 3rem)',
        overflowX: 'scroll',
        
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            height: 'auto'
        }
    },

    bookingCard: {
        width: 380,
        minWidth: 380,
        height: '100%',
        margin: '0 20px',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '0 auto 40px',
            height: 440,
            maxWidth: 410,
            minWidth: 0
        }
    }
});

export default styles;