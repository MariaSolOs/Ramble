import { createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
    root: {
        width: '90vw',
        margin: '70px auto 40px'
    },

    cards: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 20
    },

    card: {
        maxWidth: 300,
        minWidth: 200,
        margin: '0 20px 20px 0',
        cursor: 'pointer'
    },

    cardMedia: { height: 150 }
});

export default styles;