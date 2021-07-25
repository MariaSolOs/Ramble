import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        margin: '0 auto',
        maxWidth: 1300,

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
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
            backgroundColor: '#323232',
            cursor: 'pointer'
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
        }
    },

    infosContainer: {
        width: '38%',
        marginLeft: '2%',
        height: '100%'
    },

    dayDetails: {
        backgroundColor: '#404040',
        marginTop: 44.406,
        height: 'calc(62% - 44.406px)',
        borderRadius: 10
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
            padding: '1rem'
        }
    },

    infoIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: '1.1rem'
    },

    formTitle: {
        margin: 0,
        fontSize: '1.1rem'
    },

    formDescription: { 
        margin: 0,
        fontSize: '0.85rem' 
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
        display: 'inline-block'
    },

    formInput: {
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

        '& .MuiPickersCalendarHeader-dayLabel': {
            color: '#ECEBE5',
        },

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
            '& h4, h6, h3': {
                color: '#2B2B2B  !important' 
            }
        },

        '& .MuiPickersClock-pin, & .MuiPickersClockPointer-pointer, & .MuiPickersClockPointer-noPoint': {
            backgroundColor: '#000'
        },

        '& .MuiPickersClockPointer-thumb': {
            border: '14px solid #000'
        }
    },

    experienceSelect: {
        minWidth: 162,
        borderBottom: '1px solid #FFF'
    },

    experienceMenu: {
        '& .MuiPaper-root': {
            backgroundColor: '#2A2A2A',
            color: '#929293',
            borderRadius: '1rem'
        },

        '& .MuiMenuItem-root': {
            lineHeight: 1.1,
            fontSize: '0.8rem',

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
        margin: 'auto 0 0'
    }
});

export default styles;