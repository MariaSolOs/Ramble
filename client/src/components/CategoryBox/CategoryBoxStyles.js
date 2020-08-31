const styles = (theme) => ({
    root: {
        borderRadius: '1rem',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props => props.backgroundColor,
        backgroundImage: props => props.backgroundImage,
        width: props => props.width,
        height: props => props.height,
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: props => 
            props.iconLocation === 'top'? 'column' : 'row',
        '& img': {
            width: 25, 
            height: 25,
            marginRight: 4
        }
    },
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 600,
        fontSize: '1.05rem',
        color: 'white',
        letterSpacing: '-0.04rem',
        textAlign: 'center'
    }
});
export default styles;