import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    inputRoot: {
        letterSpacing: '-0.05rem',
        fontWeight: theme.typography.fontWeightBold,

        '& .MuiOutlinedInput-input': { padding: 15 }
    },

    inputFocused: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CDCDCD !important'
        }
    },

    labelRoot: { opacity: 0 },

    labelFocused: {
        paddingRight: 5,
        opacity: 1,
        fontWeight: theme.typography.fontWeightBold
    }
});

export default styles;