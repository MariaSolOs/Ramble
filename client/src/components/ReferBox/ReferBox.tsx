import { makeStyles } from '@material-ui/core/styles';
import styles from './ReferBoxStyles';
const useStyles = makeStyles(styles);

const ReferBox = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            
        </div>
    );
}

export default ReferBox;