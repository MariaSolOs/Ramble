const styles = () => ({
    //Containers
    location: {
        width: '100%',
        margin: '1% 0 2%',
    },
    meetPoint: {
        width: '100%',
        margin: '1% 0 2%',
        '& $title': { marginBottom: 0 },
        '& .lower-comment': { 
            fontSize: '0.95rem',
            marginTop: '1rem'
        }
    },
    
    //General text
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        marginTop: 0,
        marginBottom: '0.5rem',
        color: '#FFF',
        cursor: 'default',
        '&.meetPoint': { fontSize: '2rem' }
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

    //Zoom info styles
    onlineInfo: {
        marginTop: 30,

        '& $title': { 
            fontSize: '1.5rem',
            margin: 0 
        }
    },
    switch: {
        margin: '10px 0 10px -8px',
        '& .MuiSwitch-track': { 
            backgroundColor: '#929293',
        }
    },
    zoomTextfields: {
        width: 380,

        '& .zoom-textfield': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
            letterSpacing: '-0.05rem',
            color: '#FFF',
            backgroundColor: '#2A2A2A',
            width: '100%',
            padding: '10px 15px',
            height: 45,
            borderRadius: '1rem',
            marginBottom: 15
        }
    },

    //For autcomplete searchbars
    searchContainer: {
        '& .algolia-places': { width: 380 },
        '& .ap-input': {
            backgroundColor: '#2A2A2A',
            color: '#FFF',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
            letterSpacing: '-0.05rem',
            height: 56,
            border: 'none',
            '&:focus': { border: '2px solid #CDCDCD' }
        },
        '& .ap-dropdown-menu': {
            backgroundColor: '#2A2A2A',
            color: '#929293',
            borderRadius: '1rem',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            letterSpacing: '-0.05rem'
        },
        '& .ap-suggestion': {
            height: 40,
            backgroundColor: '#2A2A2A !important',
            '&:hover': {
                backgroundColor: '#2A2A2A',
                color: '#FFF',
                transition: 'all 200ms ease-in-out'
            },
            '&:focus': {
                backgroundColor: '#2A2A2A',
                color: '#FFF',
                transition: 'all 200ms ease-in-out'
            }
        },
        '& .ap-footer': { display: 'none' },
        '& .ap-suggestion-icon': { display: 'none' },
        '& .ap-icon-pin': { display: 'none' }
    }
});
export default styles;