import MUITextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

import { makeStyles } from '@material-ui/core/styles';
import styles from './TextField.styles';
const useStyles = makeStyles(styles);

interface Props extends Omit<OutlinedTextFieldProps, 'variant'> {
    inputprops?: Partial<OutlinedInputProps>;
}

const TextField = (props: Props) => {
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
        FormHelperTextProps={{
            classes: {
                root: classes.helperTextRoot
            }
        }}
        { ...props } />
    );
}

export default TextField;