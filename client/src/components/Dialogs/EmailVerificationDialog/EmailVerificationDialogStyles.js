const styles = () => ({
    paper: {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.1rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
    },

    content: {
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        flexDirection: props => 
            props.showEmailForm? 'column' : 'row',
        textAlign: props => 
            props.showEmailForm && 'center',

        '&:first-child': { paddingTop: 8 },
        '& .fa-paper-plane': {
            fontSize: '2.5rem',
            marginRight: '1rem'
        }
    },

    userName: {
        fontSize: '1.2rem',
        marginTop: 8
    },

    emailInput: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        width: '70%',
        margin: '5px auto 10px',
        padding: '0 15px',
        borderRadius: '1rem',
        backgroundColor: '#2A2A2A',

        '& .MuiInputBase-input': {
            textAlign: 'center',
            '&::placeholder': {
                fontSize: '0.8rem'
            }
        },
    },

    actions: {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0 10px -10px',
        '& $button:first-child': {
            color: 'darkgrey',
            marginRight: 10 
        }
    },
    button: {
        border: 'none',
        borderRadius: '1.7rem',
        fontSize: '0.9rem',
        font: 'inherit',
        letterSpacing: '-0.04rem',
        display: 'block',
        color: '#FFF',
        backgroundColor: 'transparent',
        textAlign: 'center',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        '&:focus': { outline: 'none' },
    }
});
export default styles;