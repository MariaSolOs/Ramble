import React from 'react';

import MUIChip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/core/styles';
import styles from './SettingStyles';
const useStyles = makeStyles(styles);

const Chip = (props) => {
    const classes = useStyles();

    return (
        <MUIChip 
        icon={props.icon} 
        classes={{
            root: classes.chipRoot,
            label: classes.chipLabel,
            icon: classes.chipIcon
        }} {...props}/>
    );
}

export default Chip;