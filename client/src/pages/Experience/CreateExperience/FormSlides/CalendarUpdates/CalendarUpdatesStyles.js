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
        margin: '0 0 10px',
        color: '#CDCDCD',
        lineHeight: 1.5,
        cursor: 'default'
    },

    calendar: {
        '&.react-datepicker': {
            backgroundColor: '#2F2E2E',
            border: 'none'
        },
        '& .react-datepicker__header': {
            backgroundColor: 'transparent',
            border: 'none',
            '& .react-datepicker__current-month': {
                color: '#FFF',
                fontSize: '1rem'
            }
        },
        '& .react-datepicker__day-name': {
            color: '#FFF',
            fontWeight: 'bold'
        },
        '& .react-datepicker__navigation': {
            '&:focus': { outline: 'none' }
        },
        '& .react-datepicker__month': {
            marginTop: 0
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
    }
});
export default styles;