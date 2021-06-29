import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import type { StyleProps } from './CreatorCalendar';

const styles = (theme: Theme) => createStyles({
    calendar: {
        '& .fc .fc-daygrid-day-frame': {
            height: 68,
            cursor: 'pointer'
        },

        '& .fc .fc-day-disabled .fc-daygrid-day-frame': {
            cursor: 'not-allowed'
        },

        '& .fc .fc-day-disabled': {
            backgroundColor: 'transparent'
        },

        '& .fc .fc-timegrid-slot': {
            height: (props: StyleProps) => `${373 / props.numSlots}px`
        },

        '& .fc .fc-timegrid-slot-lane': { 
            cursor: 'pointer' 
        },

        '& .fc .fc-toolbar-title': {
            fontSize: '1.15rem',
            [theme.breakpoints.down('xs')]: { fontSize: '0.95rem' }
        },

        '& .fc .fc-daygrid-day.fc-day-today': {
            backgroundColor: 'transparent'
        },

        '& .fc .fc-button': {
            fontWeight: theme.typography.fontWeightBold,
            fontSize: '0.9rem',
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

        '& .fc .fc-timegrid-event .fc-event-time': {
            fontSize: '0.9rem'
        },

        '& .fc .fc-daygrid-dot-event': {
            padding: 0,
            fontSize: 10,
            fontWeight: theme.typography.fontWeightRegular,
            height: 12,
            marginLeft: 0
        },

        '& .fc .fc-daygrid-day-events': {
            marginTop: -5
        },

        '& .fc .fc-prev-button, & .fc .fc-next-button': {
            [theme.breakpoints.down('xs')]: { padding: '2px 3px' }
        }
    }
});

export default styles;