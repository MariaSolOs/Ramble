import type { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import type { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

import MUITextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './TextField.styles';
const useStyles = makeStyles(styles);

interface TextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'> {
    inputprops?: Partial<OutlinedInputProps>;
}

const TextField = (props: TextFieldProps) => {
    const classes = useStyles();

    return (
        <MUITextField
        variant="outlined"
        InputProps={{
            classes: {
                root: classes.inputRoot,
                focused: classes.inputFocused
            },
            ...props.inputprops 
        }}
        InputLabelProps={{
            classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
            }
        }}
        { ...props } />
    );
}

export default TextField;