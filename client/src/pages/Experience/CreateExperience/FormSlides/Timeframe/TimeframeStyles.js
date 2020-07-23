const styles = () => ({
    //General text
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '0.5rem',
        color: '#FFF',
        cursor: 'default' 
    },
    description: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '1rem',
        color: '#CDCDCD',
        lineHeight: 1.5,
        cursor: 'default'
    },

    //Frequency textfield
    input: { 
        display: 'flex',
        width: 180,
        '& .MuiFormControl-root': { width: '100%' },
        '& .MuiSelect-root, & .MuiInputBase-input': { 
            textAlign: 'center',
            fontSize: '1rem',
            paddingTop: 12,
            paddingBottom: 12,
            lineHeight: '1.1876em'
        }
    },
    select_menu: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '1rem',
        fontSize: '0.85rem',
        maxHeight: 140,
        overflowY: 'scroll',
        minWidth: '0 !important',
        width: 120,
        letterSpacing: '-0.05rem',
        marginTop: 10,
        transform: 'translateX(-120px) !important',
        '& .MuiMenuItem-root': {
            fontFamily: 'Helvetica',
            fontWeight: 'bold', 
            letterSpacing: '-0.05rem',
            justifyContent: 'center',
            padding: '4px 16px'
        }
    },

    timeframe: {
        width: '50%',
        height: 45,
        '& .react-daterange-picker__wrapper': { 
            borderRadius: '0.7rem',
            padding: '0 5px' 
        },
        '& .react-daterange-picker__inputGroup__input, & .react-daterange-picker__inputGroup': {
            color: '#FFF',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            maxWidth: 115,
            fontSize: '1.1rem',
            margin: '0 3px',
            letterSpacing: '-0.05rem',
            '&:invalid': { background: 'none' },
            '&:focus': { outline: 'none' }
        },
        '& .react-daterange-picker__range-divider': { 
            margin: '0 auto',
            color: '#FFF',
            fontFamily: 'Helvetica, sans-serif',
            letterSpacing: '-0.05rem',
            fontWeight: 'bold',
            fontSize: '1rem',
        },
        '& .react-daterange-picker__button': {
            marginLeft: 'auto',
            '& svg': { stroke: '#FFF !important' },
            '&:focus': { outline: 'none' }
        },
        '& .react-daterange-picker__calendar': {
            right: '0 !important',
            left: 'auto !important',
            width: '100%',
        }
    },

    calendar: {
        borderRadius: '1rem',
        backgroundColor: '#2F2E2E',
        border: 'none',
        margin: '15px 0 0 auto',
        padding: '0.5rem',
        width: '85%',
        //Month and arrows
        '& .react-calendar__navigation': {
            marginBottom: 0,
            width: '100%',
            height: 30,
            '& button': {
                fontFamily: 'Helvetica, sans-serif',
                color: '#FFF',
                letterSpacing: '-0.05rem',
                fontWeight: 'bold',
                fontSize: '1.1rem',
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
            margin: '0 auto'
        },
        '& .react-calendar__month-view__weekdays': {
            fontFamily: 'Helvetica, sans-serif',
            fontSize: '0.9rem',
            color: '#C4C4C5',
            '& abbr': { textDecoration: 'none' }
        },
        '& .react-calendar__tile, & .react-calendar__tile--now': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            color: '#C4C4C5',
            background: 'none',
            transition: 'color 200ms ease-in-out',
            padding: '7px 5px',
            '&:disabled': { 
                transform: 'scale(0)',
                padding: 0
             },
            '&:hover': {
                borderRadius: '10%',
                color: '#151515',
                background: '#C4C4C5'
            },
            '&:focus': { background: 'none' },
            '&.react-calendar__tile--active': { 
                borderRadius: '10%',
                color: '#151515',
                background: 'rgba(196, 196, 197, 0.3)'
            }
        },
    },
});
export default styles;