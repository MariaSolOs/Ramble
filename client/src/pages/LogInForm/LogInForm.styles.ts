import { createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
    background: {
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #2BB282 0%, #2D73EA 100%)',
        display: 'flex'
    },

    paper: {
        width: 400,
        margin: '120px auto 0',
        justifyContent: 'center',
        padding: 15,
        height: 'fit-content'
    },

    title: {
        textAlign: 'center',
        margin: '10px 0'
    },

    formControl: { marginBottom: '2rem' }
});

export default styles;