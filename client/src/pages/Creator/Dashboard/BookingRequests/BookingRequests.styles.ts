import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        marginTop: '2rem',
        height: 'calc(100% - 2rem)',
        flexWrap: 'wrap'
    },

    bookingCard: {
        width: 380,
        height: '100%',
        margin: '0 20px',

        [theme.breakpoints.down('sm')]: {
            width: '90%',
            margin: '0 auto 40px',
            height: 440,
            maxWidth: 420
        }
    }
});

export default styles;