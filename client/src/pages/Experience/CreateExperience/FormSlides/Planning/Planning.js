import React from 'react';

import TextField from '../../../../../components/Input/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './PlanningStyles';
const useStyles = makeStyles(styles);

const Planning = ({description, submitInput}) => {
    const classes = useStyles();

    const handleChange = (e) => {
        submitInput('description', e.target.value);
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Planning</h1>
            <p className={classes.description}>
                Please provide a precise summary of your experience. This description
                will be displayed on the experience page.
            </p>
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