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
        border: props => 
            props.isCreator? 'solid 1px black' : 'none',
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
            borderRadius: '0.65rem',

            '&:first-child': {
                textIndent: props => 
                    props.withNotifIcon && 35
            },
            '&:last-child': { margin: 0 },
        },
        '& a.active, & a:hover': {
            backgroundColor: props => 
                props.isCreator? 'rgba(220, 220, 220, 0.96)' : 
                                 'rgba(118, 118, 118, 0.96)',
            transition: 'all 0.3s ease-in-out'
        }
    },

    numNotifs: {
        borderRadius: '50%',
        backgroundColor: '#F93E35',
        color: '#FFF',
        fontSize: '1rem',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20, height: 20,
        padding: 2,
        marginLeft: 15,
        textIndent: 0
    }
});

export default styles;