import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import type { StyleProps } from './ExperienceCard';

const styles = (theme: Theme) => createStyles({
    root: {
        borderRadius: '1.5rem',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',

        '&:hover': {
            transform: 'scale(1.03)',
            transition: 'transform 0.5s'
        }
    },

    image: {
        objectFit: 'cover',
        height: '60%',
        width: '100%'
    },

    body: {
        backgroundColor: '#2D2E2E',
        letterSpacing: '-0.02rem',
        color: '#ECEBE5',
        height: '40%',
        marginTop: -5,
        padding: '5px 10px 10px'
    },

    online: {
        position: 'absolute',
        top: 10, 
        left: 10,
        width: 62,
        color: '#2D2E2E',
        backgroundColor: 'rgba(256, 256, 256, 0.56)',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.45rem',
        textTransform: 'uppercase',
        letterSpacing: 0
    },

    onlineImg: {
        width: 20,
        margin: 2
    },

    title: {
        fontSize: '0.9rem',
        margin: 0,
        textAlign: 'left',
        overflowWrap: 'break-word'
    },

    location: {
        margin: 0,
        fontSize: '0.8rem',
        fontWeight: theme.typography.fontWeightRegular
    },

    rating: {
        margin: 0,
        display: 'inline-flex',
        alignItems: 'center'
    },

    starIcon: {
        width: '1rem',
        height: '1rem',
        marginLeft: 5
    },

    priceInfo: {
        fontSize: '0.7rem',
        margin: (props: StyleProps) =>
            props.hasRatingInfo ? '-8px 0 0' : 0,
        textAlign: 'end',

        [theme.breakpoints.down(380)]: { fontSize: '0.55rem' }
    },

    price: {
        fontSize: '1.1rem',
        letterSpacing: '-0.02rem',

        [theme.breakpoints.down(380)]: { fontSize: '0.9rem' }
    }
});

export default styles;