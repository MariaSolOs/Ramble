import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
import type { StripeElementStyle } from '@stripe/stripe-js';

const styles = (theme: Theme) => createStyles({
    root: {
        width: 370,
        margin: '0 auto',
        maxWidth: '100%'
    },

    dateTitle: {
        fontSize: '1.3rem',
        margin: 0,

        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    timeslotTitle: {
        fontSize: '1.1rem',
        color: '#CBCBCB',
        margin: 0,

        [theme.breakpoints.down('xs')]: { fontSize: '0.95rem' }
    },

    divisor: {
        backgroundColor: '#CBCBCB',
        padding: '0.5px 0',
        margin: '1rem auto 0',
        width: 70
    },

    stripeInput: {
        marginTop: '1rem',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 8
    }
});

export const stripeStyles: StripeElementStyle = {
    base: {
        fontFamily: 'Helvetica, sans-serif',
        backgroundColor: '#FFF',
        color: '#2A2A2A',
        fontSize: '16px',

        '::placeholder': {
            color: '#CBCBCB'
        }
    }
}

export default styles;