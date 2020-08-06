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

    tip: { marginTop: -10 },
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
            '&:hover': { color: '#2B2B2B' },
            '&:focus': { outline: 'none' }
        },
        '& .react-datepicker__day--in-selecting-range': {
            backgroundColor: 'rgba(236, 235, 229, 0.4)',
            '&:hover': { backgroundColor: 'rgba(236, 235, 229, 0.4)' }
        },
        '& .react-datepicker__day--disabled': {
            opacity: 0.5,
            fontWeight: 200
        },
        '& .react-datepicker__day--selected, & .react-datepicker__day--in-range': {
            backgroundColor: '#ECEBE5',
            color: '#2B2B2B',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: 'rgba(236, 235, 229, 0.4)' }
        }
    }
});
export default styles;