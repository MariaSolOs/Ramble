import React, { useState, useEffect } from 'react';
import { LanguageText as text } from '../SlidesText';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Tip from '../../../../components/Tip/Tip';

import { makeStyles } from '@material-ui/core/styles';
import styles from './QuickInfosStyles';
const useStyles = makeStyles(styles);

const Language = ({ allLanguages, selectedLanguages, submitInput, lang }) => {
    const classes = useStyles();

    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('Loading...');
    useEffect(() => {
        if(allLanguages.length > 0) { 
            setOptions(allLanguages); 
        }
    }, [allLanguages]);

    const handleChange = (_, value, reason) => {
        // User can select at most 3 languages
        if (reason === 'select-option') {
            if (value.length >= 3) {
                setOptions([]);
                setMessage('You can pick a maximum of 3 languages.');
            } else { 
                submitInput('languages', value); 
            }
        } else if (reason === 'remove-option') {
            setOptions(allLanguages);
            setMessage('Loading...')
            submitInput('languages', value);
        }
    }

    const handleOptionSelected = (option, value) => (
        value.includes(option)
    );

    return (
        <>
            <div>
                <h1 className={classes.title}>
                    {text.infos[lang]}
                    <span className={classes.greyCaps}>2 of 4</span>
                </h1>
            </div>
            <div className={classes.formGroup}>
                <h2 className={classes.title}>{text.title[lang]}</h2>
                <p className={classes.description}>{text.desc[lang]}</p>
                <Tip>{text.tip[lang]}</Tip>
                <Autocomplete
                onChange={handleChange}
                getOptionSelected={handleOptionSelected}
                value={selectedLanguages}
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