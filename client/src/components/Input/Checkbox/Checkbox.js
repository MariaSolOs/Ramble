import React from 'react';

import MUICheckbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import {makeStyles} from '@material-ui/core/styles';
import styles from './CheckboxStyles';
const useStyles = makeStyles(styles);

/**
 * Customized round white checkbox
 * @param {Object} props - Any props accepted by MUI
 */
const Checkbox = (props) => {
    const classes = useStyles();
    return (
        <MUICheckbox {...props} 
        icon={<RadioButtonUncheckedIcon/>}
        checkedIcon={<FiberManualRecordIcon/>} 
        disableRipple
        classes={{
            root: classes.root,
            checked: classes.checked
        }}/>
    );
}

export default Checkbox;