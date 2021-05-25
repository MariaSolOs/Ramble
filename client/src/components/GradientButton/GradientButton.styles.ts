import { createStyles, Theme } from '@material-ui/core/styles';
import { Props } from './GradientButton';

const styles = (theme: Theme) => createStyles({
    root: {
        padding: '0.45rem 0.75rem',
        borderRadius: '2rem',
        border: 'none',
        background: ({ rambleButtonType } : Props) => {
            switch(rambleButtonType) {
                case 'experience': 
                    return 'linear-gradient(to right, #2BB282 0%, #2D73EA 100%)'
                default: 
                    return ''
            }
        },
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem',
        color: '#ECEBE5',
        cursor: 'pointer',

        '&:focus': { outline: 'none' },
        '&:disabled': { 
            pointerEvents: 'none'
        }
    }
});

export default styles;