import React from 'react';
import { TitleText as text } from '../SlidesText';

import TextField from '../../../../components/Input/TextField/TextField';
import Tip from '../../../../components/Tip/Tip';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from '@material-ui/core/styles';
import styles from './TitleStyles';
const useStyles = makeStyles(styles);

const Title = ({ title, submitInput, lang }) => {
    const classes = useStyles();
    const handleChange = (e) => {
        if(e.target.value.length <= 50) {
            submitInput('title', e.target.value);
        }
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>{text.title[lang]}</h1>
            <p className={classes.description}>{text.msg[lang]}</p>
            <Tip>{text.tip[lang]}</Tip>
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
