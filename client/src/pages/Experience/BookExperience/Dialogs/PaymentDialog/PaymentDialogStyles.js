const styles = () => ({
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '0 0 0 10px',
        font: 'inherit',
        '& .goBackIcon': {
            float: 'left',
            color: '#FFF',
            fontSize: '2.5rem',
            marginLeft: -10,
            cursor: 'pointer',
            display: 'block',
        },
        '& .title': {
            margin: '1rem auto 1rem 0',
            fontSize: '1.4rem',
            color: '#FFF',
        },
    },

    expWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1.5rem'
    },

    payMethod: {
        width: '90%',
        margin: '0 auto'
    },

    checkboxField: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 0 1rem',
        width: '100%',
        '& p': {
            color: '#C8C8C8',
            fontSize: '0.85rem',
            margin: 0
        },
        '& .MuiCheckbox-root': {
            padding: '0 9px'
        }
    },
    stripeBase: { 
        height: 30,
        '& .__PrivateStripeElement': {
            height: '100%'
        },
        '& .__PrivateStripeElement-input': {
            height: 30
        }
    },

    totalPrice: {
        display: 'flex',
        width: '90%',
        justifyContent: 'space-between',
        margin: '1rem auto',
        '& p': {
            margin: 0,
            font: 'inherit',
            color: '#FFF',
            fontSize: '1.3rem',
        },
        '& span': { fontSize: '0.9rem' }
    },

    emailForm: {
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        margin: '0 auto',
        '& $label': { margin: 0 },
        flexDirection: props => 
            props.showEmailForm? 'column' : 'row',
    },
    emailInput: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        width: '80%',
        margin: '5px auto 0',
        padding: '0 15px',
        borderRadius: '1rem',
        border: '1px solid #FFF',
        '& .MuiInputBase-input': {
            textAlign: 'center'
        }
    },

    //For the email form and payment method
    label: {
        margin: '0 0 10px',
        color: '#C8C8C8',
        font: 'inherit',
        fontSize: '0.85rem',
        '&.email': {
            textAlign: props =>
                props.showEmailForm && 'center'
        }
    },

    policyMessage: {
        font: 'inherit',
        fontWeight: 400,
        color: '#C8C8C8',
        fontSize: '0.9rem',
        margin: '1.2rem auto 0',
        width: '80%',
        '& a': {
            textDecoration: 'none',
            fontWeight: 'bold',
            color: 'inherit'
        }
    },

    submitMessage: {
        '& span': { fontSize: '0.75rem' }
    }
});
export default styles;