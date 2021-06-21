import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    subtitle: { margin: '8px 0' },

    typeBoxes: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 320,
        marginTop: 40,

        [theme.breakpoints.down('xs')]: { width: '100%' }
    },

    typeBox: {
        cursor: 'pointer',
        color: '#ECEBE5', 
        backgroundColor: '#2A2A2A',
        width: 150,
        height: 190,
        transition: 'all 300ms ease-in-out',
        position: 'relative',
        fontSize: '0.95rem',
        padding: 14,
        boxSizing: 'border-box',
        borderRadius: 20,

        '&:hover': {
            backgroundColor: '#ECEBE5',
            color: '#2B2B2B'
        },

        [theme.breakpoints.down('xs')]: { width: '47%' }
    },

    typeBoxHeader: {
        height: 30,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },

    onlineIcon: { 
        fontSize: '1.2rem',
        marginRight: 12
    },

    personIcon: { 
        fontSize: '1.7rem',
        marginRight: 10
    },

    typeBoxDivider: {
        padding: '0.5px 0',
        backgroundColor: '#CECECE',
        width: '30%',
        position: 'absolute',
        top: 54,
        left: 0
    },

    typeBoxMessage: { margin: '30px 0 0' },

    locationAutocomplete: {
        marginTop: '1rem',
        '& .MuiInputBase-root': { borderRadius: 4 }
    },

    autocompletePaper: {
        fontSize: '0.85rem',
        maxHeight: 200,
        overflowY: 'scroll',

        [theme.breakpoints.down('xs')]: { 
            maxHeight: 150,
            '& .MuiAutocomplete-listbox': {
                maxHeight: '100%',
                padding: 0
            },
            '& .MuiAutocomplete-option': {
                minHeight: 0,
                padding: '8px 0 6px 10px'
            }
        },
    },

    locationInfoContainer: { 
        marginTop: 50,
        [theme.breakpoints.down('xs')]: { marginTop: 35 }
    },

    tip: { margin: '0 0 10px' },

    sharedInfoRemark: {
        color: '#CDCDCD',
        fontSize: '0.9rem'
    },

    zoomTextfield: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1rem',
        color: '#FFF',
        backgroundColor: '#2A2A2A',
        width: '100%',
        padding: '10px 15px',
        height: 45,
        borderRadius: '1rem',
        marginBottom: 15,

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' },

        '& .MuiSvgIcon-root': { fill: '#929293' }
    },

    zoomTooltip: {
        letterSpacing: '-0.02rem',
        color: '#FFF'
    },

    tooltipLink: {
        fontWeight: 'bold',
        color: '#FFF'
    }
});

export default styles;