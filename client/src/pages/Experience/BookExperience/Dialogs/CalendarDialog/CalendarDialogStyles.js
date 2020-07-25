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
        '&.react-calendar': {
            width: 270,
            margin: '15px auto 30px',
            '& button': {
                border: 'none',
                backgroundColor: 'transparent',
                '&:focus': { outline: 'none' }
            }
        },
        //Month and arrows
        '& .react-calendar__navigation': {
            height: 42,
            '& button': {
                fontFamily: 'Helvetica, sans-serif',
                color: '#C4C4C5',
                letterSpacing: '-0.05rem',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                '&:disabled': { opacity: 0 },
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
        '& .react-calendar__month-view__weekdays__weekday': {
            fontFamily: 'Helvetica, sans-serif',
            fontSize: '1rem',
            color: '#C4C4C5',
            padding: 8,
            textAlign: 'center',
            '& abbr': { textDecoration: 'none' }
        },
        '& .react-calendar__tile, & .react-calendar__tile--now': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            color: '#C4C4C5',
            background: 'none',
            transition: 'color 200ms ease-in-out',
            fontSize: '1rem',
            padding: '0.75em 0.5em',
            '&:disabled': { 
                fontSize: '0.7rem',
                color: 'rgba(196, 196, 197, 0.4)',
                padding: '8.4px 5.6px',
                '&:hover': { 
                    background: 'none', 
                    color: 'rgba(196, 196, 197, 0.4)'
                }
             },
            '&:focus': { background: 'none' },
            '&:hover, &.react-calendar__tile--active': {
                borderRadius: '100%',
                color: '#151515',
                background: 'radial-gradient(circle at center, #C4C4C5 0, transparent 60%)'
            }
        }
    }
});
export default styles;