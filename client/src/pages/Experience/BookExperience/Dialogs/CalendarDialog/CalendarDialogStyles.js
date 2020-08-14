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

    content: {
        display: 'flex',
        justifyContent: 'center',
    },

    calendar: {
        '&.react-datepicker': {
            backgroundColor: 'transparent',
            border: 'none'
        },
        '& .react-datepicker__header': {
            backgroundColor: 'transparent',
            border: 'none',
            marginBottom: 8,
            '& .react-datepicker__current-month': {
                color: '#FFF',
                fontSize: '1.25rem',
                marginBottom: 4
            }
        },
        '& .react-datepicker__month-container': {
            fontSize: '1rem',
            width: 300
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
            fontWeight: 200,
            '&.react-datepicker__day:hover': {
                backgroundColor: 'transparent',
                color: '#ECEBE5'
            }
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