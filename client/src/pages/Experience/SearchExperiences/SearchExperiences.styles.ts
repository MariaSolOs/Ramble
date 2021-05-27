import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '80vw',
        minWidth: 290,
        maxWidth: '100vw',
        minHeight: 'calc(100vh - 100px)',
        margin: '100px auto 0',

        [theme.breakpoints.down('sm')]: {
            width: '90vw'
        }
    },

    searchContainer: {
        display: 'flex',
        width: '100%',

        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',

            '& $capacityInput, & $autocomplete, & $searchButton': {
                minWidth: '90vw',
                marginTop: 10
            }
        }
    },

    capacityInput: { 
        width: 180,
        marginRight: '1.5rem'
    },

    autocomplete: {
        width: '30%',
        maxWidth: 340,
        minWidth: 280,
        marginRight: '1.5rem'
    },

    searchButton: {
        width: 90
    }
});

export default styles;