const styles = () => ({
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: 0,
        '& .closeIcon': {
            float: 'left',
            color: '#FFF',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'block',
        },
        '& .title': {
            margin: '5px auto 0 30px',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            letterSpacing: '-0.03rem',
            color: '#FFF',
            fontFamily: 'Helvetica, sans-serif'
        }
    },

    calendar: {
        backgroundColor: 'transparent',
        border: 'none',
        width: 270,
        margin: '15px auto 30px',
        //Month and arrows
        '& .react-calendar__navigation': {
            marginBottom: 0,
            width: '100%',
            '& button': {
                fontFamily: 'Helvetica, sans-serif',
                color: '#C4C4C5',
                letterSpacing: '-0.05rem',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                backgroundColor: 'transparent',
                '&:disabled': { opacity: 0 },
                '&:hover': { backgroundColor: 'transparent' },
                '&:focus': { backgroundColor: 'transparent' },
                '&.react-calendar__navigation__arrow svg': {
                    fontSize: '2rem'
                }
            }
        },
        //Weekdays and dates
        '& .react-calendar__viewContainer': {
            width: '85%',
            margin: '0 auto'
        },
        '& .react-calendar__month-view__weekdays': {
            fontFamily: 'Helvetica, sans-serif',
            fontSize: '1rem',
            color: '#C4C4C5',
            '& abbr': { textDecoration: 'none' }
        },
        '& .react-calendar__tile, & .react-calendar__tile--now': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            color: '#C4C4C5',
            background: 'none',
            transition: 'color 200ms ease-in-out',
            fontSize: '1rem',
            '&:disabled': { 
                fontSize: '0.7rem',
                color: 'rgba(196, 196, 197, 0.4)',
                '&:hover': { 
                    background: 'none', 
                    color: 'rgba(196, 196, 197, 0.4)'
                }
             },
            '&:hover': {
                borderRadius: '100%',
                color: '#151515',
                background: 'radial-gradient(circle at center, #C4C4C5 0, transparent 60%)'
            },
            '&:focus': { background: 'none' },
            '&.react-calendar__tile--active': { 
                borderRadius: '100%',
                color: '#151515',
                background: 'radial-gradient(circle at center, #C4C4C5 0, transparent 60%)'
            }
        },
    }
});
export default styles;