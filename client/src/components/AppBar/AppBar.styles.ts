import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        opacity: 1,
        padding: '10px 10px 0',
        transition: 'opacity 600ms',

        '&.scrolled': {
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 600ms'
        }
    },

    link: {
        textDecoration: 'none',
    },

    brand: {
        cursor: 'pointer',
        alignContent: 'bottom'
    },

    brandLogo: {
        height: 48,
        width: 85,
        [theme.breakpoints.down('xs')]: {
            transform: 'scale(0.8)'
        }
    },

    brandName: {
        height: 30,
        paddingBottom: 2,
        marginLeft: -5,

        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
});

export default styles;