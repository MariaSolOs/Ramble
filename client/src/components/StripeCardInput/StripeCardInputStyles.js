export const baseClass = () => ({
    base: {
        height: 30,
        '& .__PrivateStripeElement': {
            height: '100%'
        },
        '& .__PrivateStripeElement-input': {
            height: 30
        }
    }
});

export const styles = {
    base: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        fontSize: '17px',
        color: '#FFF',
        fontSmoothing: 'antialiased',
        textShadow: 'none'
    },
    invalid: {
        color: '#D8246E',
        iconColor: '#D8246E',
        textShadow: 'none'
    }
}