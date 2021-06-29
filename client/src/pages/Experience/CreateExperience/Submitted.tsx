import { useHistory } from 'react-router-dom';

import { useLanguageContext } from 'context/languageContext';

import GradientButton from 'components/GradientButton/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Submitted.styles';
const useStyles = makeStyles(styles);

type Props = {
    experienceTitle: string;
}

// TODO: Redirect to creator dashboard instead of homepage
const Submitted = (props: Props) => {
    const { CreateExperience_Submitted: text } = useLanguageContext().appText;
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <h1>{text.title}</h1>
            <p className={classes.message}>
                {text.message1} 
                <strong> {props.experienceTitle} </strong> 
                {text.message2}  <br />
                {text.message3}
            </p>
            <GradientButton 
            variant="creator"
            className={classes.button}
            onClick={() => history.push('/')}>
                {text.button}
            </GradientButton>
        </div>
    );
}

export default Submitted;