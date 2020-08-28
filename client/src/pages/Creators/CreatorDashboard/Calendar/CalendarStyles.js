const styles = (theme) => ({
    root: {
        minHeight: '70vh',
        maxHeight: '84vh',
        width: 'calc(94% - 83.65px)',
        margin: '13vh auto 3vh'
    },

    //Experience navbar
    expNav: {
        display: 'flex',
        overflowX: 'scroll',
        height: '10vh',
        margin: '20px 0',

        '& img': {
            height: '95%',
            width: 'auto',
            marginRight: 15,
            borderRadius: '0.55rem',
            cursor: 'pointer'
        }
    },
    tooltip: {
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.04rem',
        fontWeight: 'bold',
        fontSize: 11,
        whiteSpace: 'nowrap'
    },

    //Titles
    title: {
        color: '#FFF',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: '2rem',
        '& a': { 
            textDecoration: 'none',
            color: '#FFF'
        }
    },
    subtitle: {
        fontSize: '1.2rem',
        margin: 0,
        color: '#FFF',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontWeight: 'bold'
    },

    body: {
        width: '55vw',
        minWidth: 560,
        margin: '0 auto'
    },
    shadowSeparator: {
        padding: 5,
        borderRadius: '2rem',
        margin: '0 5% 0 4%',
        background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)',
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    calendar: {
        display: 'flex',
        marginTop: '2rem'
    },

    datePicker: {
        marginTop: 20,
        '&.react-datepicker': {
            backgroundColor: '#2F2E2E',
            border: 'none',
            padding: 10
        },
        '& .react-datepicker__header': {
            backgroundColor: 'transparent',
            border: 'none',
            paddingTop: 0,
            '& .react-datepicker__current-month': {
                color: '#FFF',
                fontSize: '1.2rem'
            },
            '& .react-datepicker__day-names': {
                fontSize: '0.95rem'
            }
        },
        '& .react-datepicker__day-name': {
            color: '#FFF',
            fontWeight: 'bold'
        },
        '& .react-datepicker__navigation': {
            top: 13,
            '&:focus': { outline: 'none' }
        },
        '& .react-datepicker__month': {
            marginTop: 10
        },
        '& .react-datepicker__day, & .react-datepicker__day--keyboard-selected': {
            fontWeight: 'bold',
            color: '#ECEBE5',
            background: 'none',
            '&:hover': { 
                backgroundColor: '#ECEBE5',
                color: '#2B2B2B',
            },
            '&:focus': { outline: 'none' }
        },
        '& .react-datepicker__day--disabled': {
            opacity: 0.5,
            fontWeight: 200
        },
        '& .react-datepicker__day--selected': {
            backgroundColor: '#ECEBE5',
            color: '#2B2B2B',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: 'rgba(236, 235, 229, 0.4)' }
        }
    },

    instruction: {
        color: '#ACACAC',
        fontSize: '1rem',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontWeight: 'bold'
    },

    slotButton: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        width: 110,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        padding: '15px 10px',
        margin: 4,
        border: 'none',
        borderRadius: '0.8rem',
        fontSize: '0.8rem',
        textAlign: 'center',
        transition: 'background-color 400ms ease-in-out',
        '& span': { 
            fontSize: '0.7rem',
            margin: '0 3px'
        },
        '&:focus': { outline: 'none' },
        '&.selected': {
            backgroundColor: '#ECEBE5',
            color: '#2B2B2B'
        },
        '&.unselected': {
            color: '#ECEBE5', 
            backgroundColor: '#2A2A2A'
        }
    }
});
export default styles;