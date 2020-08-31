import React from 'react';
import MUITextField from '@material-ui/core/TextField';

import {makeStyles} from '@material-ui/core/styles';
import styles from './TextFieldStyles';
const useStyles = makeStyles(styles);

/**
 * Styled Ramble textfield
 * @param {SVGElement} [startadornment] - Optional icon to be added
 *                                        to the left
 * @param {SVGElement} [endadornment] - Optional icon to be added
 *                                      to the right
 * @param {Object} props - Any props accepted by MUI
 */
const TextField = (props) => {
    const classes = useStyles();
    return (
        <MUITextField 
        type="text"
        variant="outlined" 
        classes={{root: classes.textField_root}}
        InputProps={{
            classes: {
                root: classes.input_root,
                focused: classes.input_focused,
            },
            startAdornment: props.startadornment,
            endAdornment: props.endadornment
        }}
        InputLabelProps={{
            classes: {
            root: classes.label_root,
            focused: classes.label_focused
        }}}
        FormHelperTextProps={{
            classes: {
                root: classes.helperText_root
            }
        }}
        {...props}/>
    );
}

export default TextField;
