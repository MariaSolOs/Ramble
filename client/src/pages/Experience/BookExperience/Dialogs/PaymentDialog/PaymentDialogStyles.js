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
    savedCards: {
        display: 'flex',
        flexDirection: 'column',
        '& $input': { 
            width: '100%',
            marginTop: 0,
            fontSize: '1rem',
            '& .bullets': {
                fontSize: '1.2rem',
                margin: '0 5px'
            }
        }, 
        '& $checkboxField': { margin: '10px 0 0' },
    },
    savedCardsMenu: {
        backgroundColor: '#2A2A2A',
        color: '#FFF',
        borderRadius: '1rem',
        fontSize: '0.85rem',
        overflowY: 'scroll',
        minWidth: '0 !important',
        width: 170,
        letterSpacing: '-0.05rem',
        marginTop: 5,
        transform: 'translateX(-160px) !important',
        '& .MuiMenuItem-root': {
            fontFamily: 'Helvetica',
            fontWeight: 'bold', 
            letterSpacing: '-0.05rem',
            justifyContent: 'center',
            '& svg': {
                fontSize: '1.1rem',
                marginRight: 5
            },
            '& .bullets': {
                fontSize: '1.2rem',
                margin: '0 5px'
            }
        }
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
    input: {
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
        },
        '& .credit-card-icon': { 
            fontSize: '1.2rem',
            marginRight: 5
        },
        '& .MuiSelect-icon': { color: '#FFF' }
    },

    policyMessage: {
        font: 'inherit',
        fontWeight: 400,
        color: '#C8C8C8',
        fontSize: '0.9rem',
        margin: '1.2rem auto 0.3rem',
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