const styles = () => ({
    container: { display: 'flex' },
    floatButton: {
        marginLeft: 5,
        color: 'whitesmoke',
        backgroundColor: '#656565',
        '&:hover': { backgroundColor: '#656565' },
        '& svg': { fontSize: '1.2rem' },
        '&.saveButton': {
            color: props => props.saved && '#FE4164'
        }
    }
}); 
export default styles;