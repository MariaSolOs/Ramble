import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        height: 'calc(100% - 73px - 1rem)',
        width: '100%',
        display: 'flex',
        margin: '0 auto 1rem',
        maxWidth: 1300,

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            height: 'calc(100% - 67px - 1rem)'
        }
    },

    calendar: {
        height: '100%',
        width: '60%',

        [theme.breakpoints.down('sm')]: { 
            width: '100%',
            height: 'calc(100% - 51.19px)' 
        },
        
        '& .fc .fc-toolbar-chunk': {
            display: 'flex',
            alignItems: 'flex-end',
            margin: 0
        },

        '& .fc .fc-toolbar.fc-header-toolbar': {
            margin: '8px 0'
        },

        '& .fc .fc-toolbar-title': {
            marginRight: 10,
            fontSize: '1.2rem'
        },

        '& .fc .fc-button': {
            fontWeight: theme.typography.fontWeightBold,
            fontSize: '0.75rem',
            backgroundColor: '#2A2A2A',
            color: '#ECEBE5',
            border: 'none',
            letterSpacing: '-0.04rem',
            transition: 'all 300ms ease-in-out',

            '&:hover:not(:disabled)': {
                backgroundColor: '#ECEBE5',
                color: '#2B2B2B'
            },
            '&:focus': { boxShadow: 'none' },
            '&:focus-visible': { outline: 'none' }
        },

        '& .fc .fc-button-primary:disabled': {
            backgroundColor: '#2A2A2A',
            cursor: 'not-allowed'
        },

        '& .fc .fc-daygrid-day-frame, & .fc .fc-highlight': {
            backgroundColor: '#323232'
        },

        '& .fc .fc-col-header-cell': {
            backgroundColor: '#323232',
            textAlign: 'right',
            fontWeight: theme.typography.fontWeightRegular
        },

        '& .fc .fc-scrollgrid-liquid': {
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderCollapse: 'collapse'
        },

        '& .fc td, & .fc th, & .fc .fc-scrollgrid-liquid': {
            borderColor: '#404040'
        },

        '& .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events': {
            overflowX: 'hidden'
        },

        '& .fc .fc-daygrid-dot-event': { 
            padding: 0,
            [theme.breakpoints.down('xs')]: { fontSize: '0.75rem' }
        },

        '& .fc .fc-daygrid-day-bottom': { whiteSpace: 'nowrap' }
    },

    slotBullet: {
        borderRadius: '50%',
        width: 8,
        height: 8,
        minWidth: 8,
        marginRight: 4
    },

    infosContainer: {
        width: '38%',
        marginLeft: '2%',
        height: '100%'
    },

    dayDetails: {
        backgroundColor: '#323232',
        marginTop: 44.406,
        height: 'calc(62% - 44.406px)',
        borderRadius: 10,
        overflowY: 'scroll',
        
        '& $sectionTitle': { 
            padding: 8,
            zIndex: 5,
            backgroundColor: '#323232',
            position: 'sticky',
            top: 0,
            display: 'flex',

            [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
        }
    },
    
    slotContainer: {
        position: 'relative',
        padding: '5px 8px 1rem',
        transition: 'background-color 300ms ease-in-out',
        borderBottom: 'solid 0.5px #404040',

        '&:hover': { backgroundColor: '#4B4B4B' }
    },

    slotTitle: {
        display: 'inline-flex',
        alignItems: 'center',
        margin: '10px 0 0',
        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' },

        '& $slotBullet': {
            width: 15,
            height: 15,
            marginRight: 5
        }
    },

    slotInfo: {
        margin: '0 0 0 20px',
        fontSize: '0.85rem',
        '&:first-child': { margin: 0 },

        [theme.breakpoints.down('xs')]: { fontSize: '0.8rem' }
    },

    clientList: {
        listStyle: 'none',
        paddingLeft: 20,
        margin: '8px 0 0',
    },

    clientItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 5
    },

    clientAvatar: {
        width: 25,
        height: 25,
        marginRight: 5
    },

    privateBooking: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '0.8rem'
    },

    privateIcon: { fontSize: '1rem' },

    detailsDialog: {
        '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            color: 'inherit'
        }
    },

    closeDialogButton: {
        background: 'none',
        margin: '0 0 0 auto',
        color: '#ECEBE5',
        border: 'none',
        letterSpacing: '-0.04rem'
    },

    deleteSlotButton: {
        cursor: 'pointer',
        position: 'absolute',
        top: 4,
        right: 4,
        fontSize: '1rem'
    },

    disabledDelete: {
        opacity: 0.5,
        cursor: 'not-allowed'
    },

    form: {
        backgroundColor: '#404040',
        height: '33%',
        marginTop: '5%',
        borderRadius: 10,
        padding: 8,
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',

        [theme.breakpoints.down('sm')]: {
            height: '70vh',
            maxHeight: 500,
            padding: '1rem',
            borderRadius: '10px 10px 0 0',
        }
    },

    infoIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: '1.1rem'
    },

    sectionTitle: {
        margin: 0,
        fontSize: '1.1rem',

        [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' }
    },

    sectionSubtitle: { 
        margin: 0,
        fontSize: '0.85rem',

        [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
    },

    formControl: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-between',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: { marginTop: '1rem' }
    },

    formLabel: {
        fontWeight: theme.typography.fontWeightBold,
        color: '#ACACAC !important',
        fontSize: '0.9rem',
        display: 'inline-block',

        [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
    },

    formInput: {
        width: 180,

        '&:focus-visible': { outline: 'none' },
        
        '& .MuiInputBase-input': {
            padding: '0 0 4px',
            color: '#ACACAC',
            textAlign: 'center'
        },
        
        '& .MuiInput-underline:after': {
            transform: 'none',
            transition: 'none',
            borderBottom: '1px solid #FFF'
        }
    },

    dateDialog: {
        '& .MuiPickersBasePicker-pickerView': {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            color: '#ECEBE5',
        },

        '& .MuiPickersCalendarHeader-dayLabel': { color: '#ECEBE5' },

        '& .MuiDialogActions-root': {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            '& .MuiButton-textPrimary': { color: '#FFF' }
        },

        '& .MuiPickersCalendarHeader-iconButton': {
            backgroundColor: 'transparent',
            color: '#FFF'
        },

        '& .MuiPickersSlideTransition-transitionContainer > *': {
            fontWeight: theme.typography.fontWeightBold
        },

        '& .MuiPickersDay-day:not(.MuiPickersDay-dayDisabled, .MuiPickersDay-daySelected)': { 
            color: '#ECEBE5',
            cursor: 'pointer',
            transition: 'all 300ms ease-in-out',
            '&:hover': {
                backgroundColor: '#ECEBE5',
                color: '#2B2B2B'
            }
        },

        '& .MuiPickersDay-daySelected': {
            backgroundColor: '#ECEBE5',
            color: '#2B2B2B'
        },

        '& .MuiPickersClock-squareMask': {
            backgroundColor: '#ECEBE5',
            color: '#2B2B2B',
            borderRadius: '50%'
        },

        '& .MuiPickersToolbar-toolbar': {
            backgroundColor: '#ECEBE5',
            '& h4, .MuiTypography-subtitle1, h3 ': { color: '#2B2B2B ' },
            '& .MuiTypography-subtitle1:not(.MuiPickersToolbarText-toolbarBtnSelected)': {
                opacity: 0.5
            }
        },

        '& .MuiPickersClock-pin, & .MuiPickersClockPointer-pointer, & .MuiPickersClockPointer-noPoint': {
            backgroundColor: '#000'
        },

        '& .MuiPickersClockPointer-thumb': { border: '14px solid #000' }
    },

    experienceSelect: { borderBottom: '1px solid #FFF' },

    experienceMenu: {
        '& .MuiPaper-root': {
            backgroundColor: '#2A2A2A',
            color: '#929293',
            borderRadius: '1rem'
        },

        '& .MuiMenuItem-root': {
            lineHeight: 1.1,
            fontSize: '0.8rem',
            transition: 'color 300ms ease-in-out',
            '&:hover': { color: '#FFF' },

            [theme.breakpoints.down('xs')]: { minHeight: 0 }
        }
    },

    openFormButton: {
        backgroundColor: '#404040',
        border: 'none',
        color: '#FFF',
        borderRadius: 6,
        marginTop: '1rem',
        padding: '0.6rem 0',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem'
    },

    formDrawer: {
        '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            color: '#FFF',
        }
    },

    addSlotButton: {
        width: '100%',
        borderRadius: 6,
        margin: 'auto 0 0',
        '&:disabled': { filter: 'brightness(70%)' },

        [theme.breakpoints.down('sm')]: { padding: '10px 0' }
    }
});

export default styles;