import React from 'react';

import Tip from '../../../../components/Tip/Tip';
import TextField from '../../../../components/Input/TextField/TextField';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './AboutYouStyles';
const useStyles = makeStyles(styles);

const About = ({bio, submitInput}) => {
    const classes = useStyles();

    const handleChange = (e) => {
        submitInput('creatorBio', e.target.value);
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>About you</h1>
            <p className={classes.description}>
                Tell us a bit about yourself. How would your friends describe you?
            </p>
            <Tip className={classes.tip}>
                Include fun facts, what you’re passionate about, your professional 
                experience and other pertinent information.
            </Tip>
            <TextField name="about" label="About you"
            multiline rows={4} value={bio} onChange={handleChange}/>
        </div>
    );
}

export default About;