import React, {useState, useEffect} from 'react';

//Components
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Tip from '../../../../../components/Tip';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './QuickInfosStyles';
const useStyles = makeStyles(styles);

const Language = ({allLanguages, submitInput}) => {
    const classes = useStyles();

    //To restrict the user to 3 languages
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('Loading...');
    useEffect(() => {
        if(allLanguages.length > 0) { setOptions(allLanguages); }
    }, [allLanguages]);
    const handleChange = (event, value, reason) => {
        if(reason === 'select-option') {
            if(value.length >= 3) {
                setOptions([]);
                setMessage('You can pick a maximum of 3 languages.');
                return;
            } else { submitInput('languages', value); }
        } else if (reason === 'remove-option') {
            setOptions(allLanguages);
            setMessage('Loading...')
            submitInput('languages', value);
        }
    }

    return (
        <>
            <div>
                <h1 className={classes.title}>
                    Quick Infos
                    <span className={classes.greyCaps}>2 of 4</span>
                </h1>
            </div>
            <div className={classes.formGroup}>
                <h2 className={classes.title}>Language</h2>
                <p className={classes.description}>In which language will you interact with your guests?</p>
                <Tip>
                    You should host your experience in a language you speak fluently.
                </Tip>
                <Autocomplete
                onChange={handleChange}
                options={options}
                loadingText={message}
                loading={Boolean(options)}
                classes={{ 
                    paper: classes.autocomplete_search_list, 
                    popper: classes.autocomplete_loading_popper 
                }}
                multiple
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                    {...params}
                    variant="outlined"
                    classes={{ root: classes.autocomplete_textfield_root }}
                    InputProps={{
                        ...params.InputProps,
                        classes: { 
                            root: classes.autocomplete_input_root,
                            focused: classes.autocomplete_input_focused                        }
                    }}/>
                )}/>
            </div>
        </>
    );
}

export default Language;