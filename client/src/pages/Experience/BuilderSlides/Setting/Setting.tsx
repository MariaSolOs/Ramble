import { useEffect } from 'react';

import { useLanguageContext } from 'context/languageContext';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Setting.styles';
const useStyles = makeStyles(styles);

type Props = {
    isOnlineExperience?: boolean;
    onSelectType: (isOnline: boolean) => void;
    onSlideComplete: (canContinue: boolean) => void;
}

const Setting = (props: Props) => {
    const { BuilderSlides_Setting: text} = useLanguageContext().appText;
    const classes = useStyles();

    const { onSlideComplete, isOnlineExperience } = props;
    useEffect(() => {
        onSlideComplete(typeof isOnlineExperience !== 'undefined');
    }, [onSlideComplete, isOnlineExperience]);

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
            <div className={classes.typeBoxes}>
                <div 
                className={`
                    ${classes.typeBox}
                    ${isOnlineExperience === false && classes.selectedType}
                `} 
                onClick={() => props.onSelectType(false)}>
                    <div className={classes.typeBoxHeader}>
                        <EmojiPeopleIcon className={classes.personIcon} />
                        {text.inPerson}
                    </div>
                    <div className={classes.typeBoxDivider} />
                    <p className={classes.typeBoxMessage}>{text.inPersonOption}</p>
                </div>
                <div 
                className={`
                    ${classes.typeBox}
                    ${isOnlineExperience === true && classes.selectedType}
                `} 
                onClick={() => props.onSelectType(true)}>
                    <div className={classes.typeBoxHeader}>
                        <FontAwesomeIcon icon={faLaptop} className={classes.onlineIcon} />
                        {text.online}
                    </div>
                    <div className={classes.typeBoxDivider} />
                    <p className={classes.typeBoxMessage}>{text.onlineOption}</p>
                </div>
            </div>
        </>
    );
}

export default Setting;