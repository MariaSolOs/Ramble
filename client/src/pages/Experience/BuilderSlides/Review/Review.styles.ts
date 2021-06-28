import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    experienceContainer: {
        width: 450,
        height: 460,

        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: 'calc(100% + 60px)'
        }
    }
});

export default styles;