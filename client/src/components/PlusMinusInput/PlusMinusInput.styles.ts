import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleProps } from './PlusMinusInput';

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex'
    },

    textFieldRoot: {
        width: '100%'
    },

    inputRoot: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '2rem',
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        padding: '8px 15px',
        justifyContent: 'center',

        '& .MuiInputAdornment-root .MuiTypography-body1': {
            color: '#929293',
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightBold,
            fontSize: '1rem',
            letterSpacing: '-0.05rem',
        }
    },

    input: {
        width: ({ inputLength } : StyleProps) => theme.spacing(inputLength * 3),
        textAlign: 'center',
        padding: '6px 0'
    },

    buttons: {
        display: 'flex',
        flexDirection: 'column',

        '& .MuiSvgIcon-root': {
            color: '#2A2A2A',
            cursor: 'pointer',
            '&:hover': {
                color: '#FFF',
                transition: 'all 200ms ease-in-out',
            }
        }
    }
});

export default styles;