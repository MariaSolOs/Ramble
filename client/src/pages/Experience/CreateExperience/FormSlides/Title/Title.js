import React from 'react';

//Components
import TextField from '../../../../../components/Input/TextField';
import Tip from '../../../../../components/Tip';
import InputAdornment from '@material-ui/core/InputAdornment';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './TitleStyles';
const useStyles = makeStyles(styles);

const Title = ({title, submitInput}) => {
    const classes = useStyles();
    const handleChange = (e) => {
        if(e.target.value.length <= 50) {
            submitInput('title', e.target.value);
        }
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Title</h1>
            <p className={classes.description}>Give your experience a compelling title.</p>
            <Tip>Try keeping it short and exciting.</Tip>
            <TextField 
            name="title" 
            value={title} 
            onChange={handleChange}
            endadornment={<InputAdornment position="end">
                            {50 - title.length}
                          </InputAdornment>}/>
        </div>
    );
}

export default Title;