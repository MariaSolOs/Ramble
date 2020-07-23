import React, {useState} from 'react';

//MUI
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    textField_root: { 
        width: '100%',
        '&:focus': { outline: 'none' }
    },
    input_root: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '2rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        padding: '8px 15px',
        width: '100%',
        justifyContent: 'center',
        '& .MuiInputAdornment-root .MuiTypography-body1': {
            color: '#929293',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
            letterSpacing: '-0.05rem',
        }
    },
    input_input: { 
        textAlign: 'center',
        //Dynamic width according to input size
        width: props => theme.spacing(props.inputLength * 1.8),
        padding: '6px 0 6px'
    },
    numFieldButtons: {
        display: 'flex',
        flexDirection: 'column',
        '& svg': {
            color: '#2A2A2A',
            cursor: 'pointer',
            '&:hover': {
                color: '#FFF',
                transition: 'all 200ms ease-in-out',
            }
        }
    }
}));

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

