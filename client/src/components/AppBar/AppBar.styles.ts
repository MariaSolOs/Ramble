import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        opacity: 1,
        padding: '10px 0 0',
        transition: 'opacity 600ms',
        zIndex: 50,

        '&.scrolled': {
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 600ms'
        }
    },

    link: { textDecoration: 'none' },

    brand: {
        width: 150,
        cursor: 'pointer',

        [theme.breakpoints.down('xs')]: {
            transform: 'scale(0.85)'
        }
    }
});

export default styles;