const styles = (theme) => ({
    container: {
        textAlign: 'left',
        width: '70%',
        height: 'fit-content',
        margin: 'auto',
        paddingTop: '15%',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '25%'
        },

        '& h1': {
            fontWeight: 'bold',
            fontSize: '2.7rem',
            color: '#E6E6E6',
            fontFamily: 'Helvetica, sans-serif',
            letterSpacing: '-0.05rem',
            animation: '$color-bouncy 1.3s ease-in-out'
        }
    },

    //Color bouncy effect
    '@keyframes color-bouncy': {
        '0%': {  
            transform: 'translate(0)',
            textShadow: 
                '0 0 0 #0C2FFB,' + 
                '0 0 0 #2CFCFD,' +
                '0 0 0 #FB203B,' +
                '0 0 0 #FEFC4B'
        },
        '30%': {  
            transform: 'translate(-8px, -8px)',
            textShadow: 
                '0 0.125em 0 #0C2FFB,' + 
                '0 0.25em 0 #2CFCFD,' +
                '0 -0.125em 0 #FB203B,' +
                '0 -0.25em 0 #FEFC4B'
        },
        '60%': {  
            transform: 'translate(8px, 8px)',
            textShadow: 
                '0 -0.0625em 0 #0C2FFB,' +
                '0 -0.125em 0 #2CFCFD,' +
                '0 0.0625em 0 #FB203B,' +
                '0 0.125em 0 #FEFC4B'
        },
        '90%': {  
            transform: 'translate(0)',
            textShadow: 
                '0 0 0 #0C2FFB,' +
                '0 0 0 #2CFCFD,' +
                '0 0 0 #FB203B,' +
                '0 0 0 #FEFC4B'
            }
    },
        
    //Fade-out effect
    'fadeExit': {
        opacity: 1
    },
    'fadeExitActive': {
        opacity: 0,
        transition: 'all 1000ms ease-out'
    }
});
export default styles;