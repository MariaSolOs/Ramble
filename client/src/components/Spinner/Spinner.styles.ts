import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    backdrop: {
        width: '100vw',
        height: '100%',
        position: 'fixed',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        margin: 0,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
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

            [theme.breakpoints.down('xs')]: {
                width: 40,
                height: 40
            }
        },

        '& $bounce1': {
            '-webkit-animation-delay': '-0.32s',
            animationDelay: '-0.32s',
        },

        '& $bounce2': {
            '-webkit-animation-delay': '-0.16s',
            animationDelay: '-0.16s',
        }
    },
    bounce1: {},
    bounce2: {},
      
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