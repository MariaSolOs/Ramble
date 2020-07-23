import React from 'react';

import MUICheckbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        color: '#FFF',
        transition: 'all 200ms ease-in-out',
        '&:hover': { color: '#2F2F2F' }
    },
    checked: {
        '&.MuiCheckbox-colorSecondary': {
            color: '#FFF'
        }
    }
}));

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