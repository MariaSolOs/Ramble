const styles = (theme) => ({
    root: {
        position: 'absolute',
        right: 0
    },

    //Collapse icon
    toggleIcon: {
        '&:focus': { outline: 'none' },
        '& svg': {
            color: '#F6F6F6',
            height: '3rem',
            width: '3rem',
            margin: '0 10px'
        },
        boxShadow: 'none',
        padding: '12px 12px 0'
    },

    //Navigation links
    navLink: {
        padding: 8,
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.05rem',
        letterSpacing: '-0.07rem',
        whiteSpace: 'nowrap',
        marginRight: 10,
        color: '#ACACAC',
        '&:hover': { color: '#ACACAC' }
    },
    dialogToggler: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        '&:focus': { outline: 'none' }
    },
    //Collapsed navbar
    collapsedNav: {
        [theme.breakpoints.up('md')]: { display: 'none' }
    },
    collapsedPaper: { 
        backgroundColor: 'rgba(65, 65, 65, 0.7)',
        borderRadius: '1rem',
        padding: '0 4px',
        '&.MuiPopover-paper': {
            minWidth: 200
        },
    },
    collapsedList: {
        '& .MuiListItem-root': {
            width: '100%',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            letterSpacing: '-0.07rem',
            color: '#FFF',
            textAlign: 'center',
            justifyContent: 'center',
            borderRadius: '0.65rem',
            padding: 4,
            margin: '0 0 4px 0',
            '&:last-child': { margin: 0 }
        },
        '& a.MuiListItem-button, button.MuiListItem-button': {
            '&:hover': {
                backgroundColor: 'rgba(118, 118, 118, 0.96)',
                transition: 'all 0.3s ease-in-out'
            }
        },
        '& button': { outline: 'none' }
    },

    //Expanded navbar
    expandedLinks: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        display: 'flex',
        margin: '0 10px 0 0'
    }
});

export default styles;
