import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    label: {
        fontWeight: theme.typography.fontWeightBold,
        color: '#FFF',
        marginBottom: 5,

        [theme.breakpoints.down('xs')]: { fontSize: '0.85rem' }
    },

    form: {
        margin: '30px 0 0 20px',
        maxWidth: 950,

        [theme.breakpoints.down('xs')]: { 
            marginTop: 20,
            margin: '20px auto 30px'
        }
    },

    formControl: {
        width: '40%',
        marginBottom: '1rem',
        '&:first-child': { marginRight: '5%' },
        '&:nth-child(2)': { marginTop: 21 },

        [theme.breakpoints.down('xs')]: {
            width: '47%',
            '&:first-child': { marginRight: '4%' },
            '&:nth-child(2)': { marginTop: 18 }
        }
    }
});

export default styles;