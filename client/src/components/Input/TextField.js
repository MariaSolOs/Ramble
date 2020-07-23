import React from 'react';
import MUITextField from '@material-ui/core/TextField';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    //Input fields
    textField_root: { fontFamily: 'Helvetica, sans-serif' },
    label_root: { opacity: 0 },
    label_focused: {
        color: '#CDCDCD !important',
        background: 'linear-gradient(to bottom, #151515 0%, #2A2A2A 60%)',
        paddingRight: 5,
        opacity: 1,
        fontWeight: 'bold',
    },
    input_root: { 
        backgroundColor: '#2A2A2A',
        color: '#FFF',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },
    input_focused: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CDCDCD !important'
        }
    }
}));

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
        {...props}/>
    );
}

export default TextField;
