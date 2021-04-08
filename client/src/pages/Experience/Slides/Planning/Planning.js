import React from 'react';
import { PlanningText as text } from '../SlidesText';

import TextField from '../../../../components/Input/TextField/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from '@material-ui/core/styles';
import styles from './PlanningStyles';
const useStyles = makeStyles(styles);

const Planning = ({ description, submitInput, lang }) => {
    const classes = useStyles();

    const handleChange = (e) => {
        submitInput('description', e.target.value);
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>{text.title[lang]}</h1>
            <p className={classes.description}>{text.desc[lang]}</p>
            <TextField 
            name="planning" 
            label="Describe your experience"
            multiline 
            rows={4} 
            value={description} 
            onChange={handleChange}
            endadornment={<InputAdornment position="end">
                            {1000 - description.length}
                          </InputAdornment>}/>
        </div>
    );
}

export default Planning;