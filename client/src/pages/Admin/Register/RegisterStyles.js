const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        minWidth: 350,
        margin: '20vh auto 0',
        padding: '0 40px 10px',
        borderRadius: '0.7rem',
        border: '1px solid #C5C5C5',
        alignItems: 'center',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: '-0.05rem'
    },
    title: {
       font: 'inherit',
       fontSize: '1.3rem',
       textAlign: 'center'
    },
    submitButton: {
        width: 'fit-content',
        margin: '10px auto 0',
        '& button': {
            font: 'inherit'
        }
    },
    permissionField: { marginTop: 10 }
});
export default styles;