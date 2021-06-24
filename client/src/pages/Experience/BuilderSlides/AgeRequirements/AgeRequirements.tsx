import { useEffect } from 'react';

import { useLanguageContext } from 'context/languageContext';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import Tip from 'components/Tip/Tip';
import Checkbox from 'components/Checkbox/Checkbox';
import PlusMinusInput from 'components/PlusMinusInput/PlusMinusInput';
import PersonIcon from '@material-ui/icons/Person';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AgeRequirements.styles';
const useStyles = makeStyles(styles);

type Props = {
    isAgeRestricted: boolean;
    onAgeRestrictionChange: (restricted: boolean) => void;
    ageRequired: number;
    onAgeRequiredChange: (age: number) => void;
    onSlideComplete: (canContinue: boolean) => void;
}

const AgeRequirements = (props: Props) => {
    const { BuilderSlides_AgeRequirements: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { onSlideComplete } = props;
    useEffect(() => {
        /* There's no validation here. If they skip the slide, there's
           no restriction. If they say yes and don't modify the age,
           by default the age required is 18. */
        onSlideComplete(true);
    }, [onSlideComplete]);

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
            <Tip>{text.tip}</Tip>
            <div className={classes.checkboxContainer}>
                <div className={classes.checkboxField}>
                    <Checkbox
                    checked={props.isAgeRestricted}
                    onChange={(_, checked) => {
                        if (checked) {
                            props.onAgeRestrictionChange(checked);
                        }
                    }} />
                    <label>{text.yes}</label>
                </div>
                <div className={classes.checkboxField}>
                    <Checkbox
                    checked={!props.isAgeRestricted}
                    onChange={(_, checked) => {
                        if (checked) {
                            props.onAgeRestrictionChange(!checked);
                        }
                    }} />
                    <label>{text.no}</label>
                </div>
            </div>
            {props.isAgeRestricted &&
            <>
                <label className={classes.greyCaps}>{text.title}</label>
                <PlusMinusInput
                value={props.ageRequired}
                step={1}
                onValueChange={props.onAgeRequiredChange}
                getLabel={() => text.yearsOld}
                containerClass={classes.plusMinus}
                inputProps={{
                    startAdornment: <PersonIcon />
                }} />
            </>}
        </>
    );
}

export default AgeRequirements;