import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    title: {
        fontSize: '1.5rem',
        margin: '0 0 1rem',

        [theme.breakpoints.down('xs')]: { fontSize: '1.3rem' }
    },

    calendar: {
        '& .fc.fc-media-screen': {
            width: 330,
            margin: '0 auto',

            [theme.breakpoints.down('xs')]: { 
                maxWidth: '100%'
            }
        },

        '& .fc .fc-scrollgrid-section-body table': {
            overflow: 'hidden'
        },

        '& .fc .fc-day-disabled .fc-daygrid-day-frame': {
            cursor: 'not-allowed',
            opacity: 0.8,
            height: 40,
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: 12
        },

        '& .fc .fc-day-disabled': {
            backgroundColor: 'transparent'
        },

        '& .fc .fc-toolbar-title': {
            fontSize: '1.3rem',
            [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
        },

        '& .fc .fc-toolbar-chunk': {
            display: 'flex',
            alignItems: 'center'
        },

        '& .fc .fc-col-header-cell': {
            color: '#CDCDCD'
        },

        '& .fc .fc-daygrid-day.fc-day-today': {
            backgroundColor: 'transparent'
        },

        '& .fc .fc-button': {
            backgroundColor: '#2A2A2A',
            color: '#ECEBE5',
            border: 'none',
            transition: 'all 300ms ease-in-out',

            '&:hover:not(:disabled)': {
                backgroundColor: '#ECEBE5',
                color: '#2B2B2B'
            },
            '&:focus': { boxShadow: 'none' },
            '&:focus-visible': { outline: 'none' }
        },

        '& .fc .fc-button-primary:not(:disabled).fc-button-active': {
            backgroundColor: '#2A2A2A',
            '&:hover': {
                backgroundColor: '#ECEBE5',
                color: '#2B2B2B'
            }
        },

        '& .fc .fc-button-primary:disabled': {
            backgroundColor: '#2A2A2A'
        },

        '& .fc .fc-prev-button, & .fc .fc-next-button': {
            [theme.breakpoints.down('xs')]: { padding: '2px 3px' }
        },

        '& .fc .fc-highlight': { background: 'none' }
    },

    bookableDate: {
        '& .fc-daygrid-day-frame': {
            fontWeight: theme.typography.fontWeightBold,
            fontSize: 15,
            height: 40,
            cursor: 'pointer',

            '&:hover': {
                transition: 'all 300ms ease-in-out',
                backgroundColor: '#FFF',
                color: '#2A2A2A'
            }
        }
    },

    selectedDate: {
        backgroundColor: '#FFF',
        color: '#2A2A2A'
    }
});

export default styles;