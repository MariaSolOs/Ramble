const styles = () => ({
    root: { 
        marginTop: 100,
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },
    title: {
        color: '#FFF',
        textAlign: 'center',
    },
    actions: {
        listStyle: 'none',
        color: '#C5C5C5',
        width: '50%',
        minWidth: 300,
        margin: '0 auto',
        '& li': {
            display: 'flex',
            alignItems: 'center',
            margin: '5px 0',

            '& .MuiFab-root': {
                float: 'left',
                marginRight: '1rem'
            }
        }
    }
});
export default styles;