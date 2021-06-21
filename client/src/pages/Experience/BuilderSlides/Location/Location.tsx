import { useEffect } from 'react';
import { useLanguageContext } from 'context/languageContext';

import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from 'components/Autocomplete/Autocomplete';
import TextField from 'components/TextField/TextField';
import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import Tip from 'components/Tip/Tip';
import HelpIcon from '@material-ui/icons/Help';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Location.styles';
const useStyles = makeStyles(styles);

const ZOOM_PMI_DOCS = 'https://support.zoom.us/hc/en-us/articles/203276937-Using-Personal-Meeting-ID-PMI-';
const ZOOM_PASSWORD_DOCS = 'https://support.zoom.us/hc/en-us/articles/203276937-Using-Personal-Meeting-ID-PMI-';

type Props = {
    isOnlineExperience?: boolean;
    onSelectType: (isOnline: boolean) => void; 
    storedLocations: string[];
    location: string;
    onLocationChange: (loc: string) => void;
    meetingPoint: string;
    onMeetingPointChange: (meetPoint: string) => void;
    onSlideComplete: (canContinue: boolean) => void;
    zoomPMI: string;
    onZoomPMIChange: (pmi: string) => void;
    zoomPassword: string;
    onZoomPasswordChange: (pwd: string) => void;
}

const Location = (props: Props) => {
    const { BuilderSlides_Location: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { 
        isOnlineExperience, 
        onSlideComplete,
        location,
        meetingPoint,
        zoomPMI,
        zoomPassword
    } = props;
    useEffect(() => {
        if (typeof isOnlineExperience !== 'undefined') {
            if (isOnlineExperience) {
                onSlideComplete(
                    location.trim().length > 0 &&
                    zoomPMI.trim().length > 0 && 
                    zoomPassword.trim().length > 0
                );
            } else {
                onSlideComplete(
                    location.trim().length > 0 &&
                    meetingPoint.trim().length > 0
                );
            }
        }
    }, [isOnlineExperience, onSlideComplete, location, meetingPoint, zoomPMI, zoomPassword]);

    // Set the experience type first
    if (typeof isOnlineExperience === 'undefined') {
        return (
            <>
                <Title>{text.experienceTypeQuestion}</Title>
                <div className={classes.typeBoxes}>
                    <div className={classes.typeBox} onClick={() => props.onSelectType(false)}>
                        <div className={classes.typeBoxHeader}>
                            <EmojiPeopleIcon className={classes.personIcon} />
                            {text.inPerson}
                        </div>
                        <div className={classes.typeBoxDivider} />
                        <p className={classes.typeBoxMessage}>{text.inPersonOption}</p>
                    </div>
                    <div className={classes.typeBox} onClick={() => props.onSelectType(true)}>
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

    // Fill Zoom info or meeting point info
    return (
        <>
            <Title>{text.locationTitle}</Title>
            <Subtitle className={classes.subtitle}>{text.cityQuestion}</Subtitle>
            <Autocomplete 
            className={classes.locationAutocomplete}
            paperclass={classes.autocompletePaper}
            options={props.storedLocations}
            value={location}
            freeSolo
            onInputChange={(_, value, __) => props.onLocationChange(value)} />
            {isOnlineExperience ? 
                <div className={classes.locationInfoContainer}>
                    <InputBase 
                    value={zoomPMI}
                    onChange={e => props.onZoomPMIChange(e.target.value)}
                    placeholder={text.zoomPMI}
                    className={classes.zoomTextfield}
                    endAdornment={
                        <Tooltip
                        title={
                            <span>
                                {text.zoomPMIHelp}{' '}
                                <a 
                                className={classes.tooltipLink} 
                                href={ZOOM_PMI_DOCS} 
                                target="_blank" 
                                rel="noopener noreferrer">
                                    {text.zoomDocs}
                                </a>.
                            </span>
                        }
                        classes={{ tooltip: classes.zoomTooltip }}
                        interactive
                        placement="top">
                            <HelpIcon />
                        </Tooltip>
                    } />
                    <InputBase 
                    value={zoomPassword}
                    onChange={e => props.onZoomPasswordChange(e.target.value)}
                    placeholder={text.zoomPassword}
                    className={classes.zoomTextfield}
                    endAdornment={
                        <Tooltip
                        title={
                            <span>
                                {text.zoomPasswordHelp}{' '}
                                <a 
                                className={classes.tooltipLink} 
                                href={ZOOM_PASSWORD_DOCS} 
                                target="_blank" 
                                rel="noopener noreferrer">
                                    {text.zoomDocs}
                                </a>.
                            </span>
                        }
                        classes={{ tooltip: classes.zoomTooltip }}
                        interactive
                        placement="top">
                            <HelpIcon />
                        </Tooltip>
                    } />
                </div> :
                <div className={classes.locationInfoContainer}>
                    <Title>{text.meetingPoint}</Title>
                    <Subtitle className={classes.subtitle}>
                        {text.meetingPointQuestion}
                    </Subtitle>
                    <Tip className={classes.tip}>{text.accessTip}</Tip>
                    <TextField
                    fullWidth
                    required
                    value={meetingPoint}
                    onChange={e => props.onMeetingPointChange(e.target.value)} />
                    <p className={classes.sharedInfoRemark}>{text.sharedInfoRemark}</p>
                </div>}
        </>
    );
}

export default Location;