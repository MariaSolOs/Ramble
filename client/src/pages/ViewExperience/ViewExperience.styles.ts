import { createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
    footer: {
        position: 'fixed',
        bottom: 0, 
        left: 0, 
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#F5F5F5',
        zIndex: 5
    },

    approveButton: {
        marginRight: 10
    }
});

export default styles;