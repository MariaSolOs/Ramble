import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        position: 'absolute',
        right: 0
    },

    collapsedNav: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },

    toggleIcon: {
        '& .fa-angle-double-down': {
            color: '#F6F6F6',
            height: '3rem',
            margin: '0 10px'
        }
    },

    menuPaper: {
        backgroundColor: 'rgba(65, 65, 65, 0.7)',
        borderRadius: '1rem',
        padding: '0 4px',

        '&.MuiPopover-paper': {
            minWidth: 200
        },

        [theme.breakpoints.down('xs')]: {
            '&.MuiPopover-paper': {
                minWidth: 150
            }
        }
    },

    menuList: {
        '& .MuiListItem-root': {
            width: '100%',
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightBold,
            fontSize: '0.9rem',
            letterSpacing: '-0.07rem',
            color: '#E8E8E8',
            textAlign: 'center',
            justifyContent: 'center',
            borderRadius: '0.65rem',
            padding: 4,
            margin: '0 0 4px 0',

            '&:last-child': { margin: 0 },

            [theme.breakpoints.down('xs')]: {
                height: 30,
                minHeight: 0
            }
        },

        '& a.MuiListItem-button, button.MuiListItem-button': {
            '&:hover': {
                backgroundColor: 'rgba(118, 118, 118, 0.96)',
                transition: 'all 0.3s ease-in-out'
            }
        }
    },

    expandedLinks: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 10,

        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },

    dialogToggler: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',

        '&:focus': { outline: 'none' }
    },

    navLink: {
        padding: 8,
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1.05rem',
        letterSpacing: '-0.07rem',
        whiteSpace: 'nowrap',
        marginRight: 10,
        color: '#ACACAC',
        textDecoration: 'none',

        '&$whiteNavLink': { color: '#FFF' }
    },
    whiteNavLink: {}
});

export default styles;