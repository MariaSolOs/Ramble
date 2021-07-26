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
            height: 'auto',
            margin: '1rem 0 0'
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
            maxWidth: 410,
            minWidth: 0,
            maxHeight: 450
        }
    }
});

export default styles;