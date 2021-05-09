const styles = () => ({
    container: {
        display: 'flex',
        maxHeight: 500,
        marginTop: 15,

        '& .rcs-custom-scroll .rcs-outer-container, & .rcs-custom-scroll .rcs-inner-container': {
            height: '100%'
        },
        '& .rcs-custom-scroll .rcs-custom-scrollbar': {
            opacity: 1,
        },
        '& .rcs-inner-handle': {
            background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
        }
    },

    bookingsContainer: {
        margin: '1.3rem 50px',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
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

    tab: {
        borderRadius: 10,
        width: 'fit-content'
    },
    whiteTab: {
        backgroundColor: '#FFF',
        padding: '0.6rem 0.8rem'
    },
    greyTab: {
        backgroundColor: '#2D2E2E',
        padding: '0.8rem 1rem'
    },

    greyText: { 
        color: '#ACACAC',
        fontSize: '0.95rem',

        '& .large-num': { 
            fontSize: '1.2rem',
            margin: '0 3px'
        }
    },
    whiteText: { 
        color: '#FFF',
        fontSize: '1.4rem',
        margin: '1rem 0.2rem'
    }
});

export default styles;