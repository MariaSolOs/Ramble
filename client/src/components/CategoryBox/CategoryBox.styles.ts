import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import type { StyleProps } from './CategoryBox';

const styles = (_: Theme) => createStyles({
    root: {
        borderRadius: '1rem',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: (props: StyleProps) => props.backgroundColor,
        backgroundImage: props => props.backgroundImage
    },

    content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: props => props.iconLocation === 'top' ? 'column' : 'row'
    },

    icon: {
        width: 25, 
        height: 25,
        marginRight: props => props.iconLocation === 'left' ? 4 : 0
    },

    title: { textAlign: 'center' }
});

export default styles;