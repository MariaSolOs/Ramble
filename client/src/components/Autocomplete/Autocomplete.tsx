import MUIAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import type { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import type { StandardTextFieldProps, InputBaseProps } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Autocomplete.styles';
const useStyles = makeStyles(styles);

interface Props extends Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> {
    textfieldprops?: Partial<StandardTextFieldProps>;
    inputprops?: Partial<InputBaseProps>;
}

const Autocomplete = (props: Props) => {
    const classes = useStyles();

    return (
        <MUIAutocomplete
        classes={{ paper: classes.paper }}
        renderInput={params => (
            <TextField 
            { ...params }
            { ...props.textfieldprops }
            InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                classes: { root: classes.input },
                ...props.inputprops
            }}/>
        )}
        { ...props } />
    );
}

export default Autocomplete;