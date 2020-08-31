import React, {useState} from 'react';

//MUI
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './NumberFieldStyles';
const useStyles = makeStyles(styles);

/**
 * Customized Ramble number input with buttons
 * @param {Number} min - Minimum value 
 * @param {Number} [max] - Maximum value 
 * @param {Number} [initval] - Initial value
 * @param {Number} step - Amount to decrease/increase
 * @param {Function} getlabel - Function that outputs label based on current value
 * @param {SVGElement} [startadorment] - Icon on the left of the field
 * @param {Object} - Any props accepted my MUI
 * 
 * @returns {Array} - [Current value, component]
 */
export default function useNumberField(props) {
    //For increase/decrease buttons
    const [num, setNum] = useState(props.initval || props.min);
    const increaseNum = () => {
        if(props.max) {
            if(num < props.max) {
                setNum(+num + props.step);
            }
        } else { setNum(+num + props.step); }
    }
    const decreaseNum = () => { 
        if(num > props.min) { setNum(+num - props.step); }
    }

    //For textfield change
    const handleInputChange = (e) => { setNum(e.target.value); }

    const classes = useStyles({ inputLength: `${num}`.length });
    //For optional start adornment
    const adornment = 
    props.startadornment && <InputAdornment position="start">
                                {props.startadornment}
                            </InputAdornment>;

    const fieldComponent = 
        <>
            <TextField
            classes={{ root: classes.textField_root }}
            value={num}
            onChange={handleInputChange}
            InputProps={{
                disableUnderline: true,
                classes: { root: classes.input_root, input: classes.input_input },
                startAdornment: adornment,
                endAdornment:   <InputAdornment position="end">
                                    {props.getlabel(num)}
                                </InputAdornment>
            }}/>
            <div className={classes.numFieldButtons}>
                <AddCircleIcon onClick={increaseNum}/>
                <RemoveCircleIcon onClick={decreaseNum}/>
            </div>
        </>;

    return [num, fieldComponent];
}

