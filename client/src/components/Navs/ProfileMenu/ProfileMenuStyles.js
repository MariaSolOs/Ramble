const styles = () => ({
    //Dropdown button
    dropButton: {
        height: 45,
        width: 100,
        padding: '1% 3%',
        backgroundColor: props =>
            props.isCreator? '#FFF' : 'rgba(65, 65, 65, 0.9)',
        borderRadius: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        cursor: 'pointer',
        '&:focus': { outline: 'none' },
        '& span': {
            color: props => 
                props.isCreator? 'black' : '#E8E8E8',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
            letterSpacing: '-0.06rem',
            marginLeft: '0.6rem'
        }
    },

    menuPaper: {
        backgroundColor: props =>
            props.isCreator? '#FFF' : 'rgba(65, 65, 65, 0.9)',
        borderRadius: '1rem',
        marginTop: '0.4rem',
        padding: '0 4px',
        '&.MuiPopover-paper': {
            minWidth: 175
        }
    },
    menuList: {
        '& .MuiListItem-root': {
            width: '100%',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            letterSpacing: '-0.05rem',
            color: props => 
                props.isCreator? 'black' : '#E8E8E8',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '6px 20px',
            margin: '0 0 4px 0',
            '&:last-child': { margin: 0 },
            borderRadius: '0.65rem',
        },
        '& a.active, & a:hover': {
            backgroundColor: props => 
                props.isCreator? 'rgba(220, 220, 220, 0.96)' : 
                                 'rgba(118, 118, 118, 0.96)',
            transition: 'all 0.3s ease-in-out'
        }
    }
});

export default styles;