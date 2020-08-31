const styles = () => ({
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    spinner: {
        width: '100%',
        textAlign: 'center',
        '& > div': {
            width: 50,
            height: 50,
            backgroundColor: '#FFF',
            borderRadius: '100%',
            display: 'inline-block',
            '-webkit-animation': '$bounce 1.4s infinite ease-in-out both',
            animation: '$bounce 1.4s infinite ease-in-out both',
        },

        '& .bounce1': {
            '-webkit-animation-delay': '-0.32s',
            animationDelay: '-0.32s',
        },
        '& .bounce2': {
            '-webkit-animation-delay': '-0.16s',
            animationDelay: '-0.16s',
        }
    },
      
    '@keyframes bounce': {
        '0%, 80%, 100%': { 
            '-webkit-transform': 'scale(0)',
            transform: 'scale(0)'
        }, 
        '40%': { 
          '-webkit-transform': 'scale(1)',
          transform: 'scale(1)'
        }
    }
});
export default styles;