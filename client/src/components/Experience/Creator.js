import React, { useState } from 'react';
import { CreatorText as text } from './ExperienceText';

import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';

import { makeStyles } from '@material-ui/core/styles';
import { creatorStyles } from './ExperienceStyles';
const useStyles = makeStyles(creatorStyles);

const Creator = ({ creator, lang }) => {
    const classes = useStyles();

    // For displaying/hiding creator bio
    const [expandedBio, setExpandedBio] = useState(false);
    const handleBioToggle = () => {
        setExpandedBio(!expandedBio);
    }

    return (
        <>
            <h3 className={classes.label}>{text.hosted[lang]}</h3>
            <div className={classes.host}>
                <Avatar src={creator.user.photo} alt="Experience creator"/>
                <span className="creator-name">{creator.user.fstName}</span>
                <button 
                className={classes.bioToggler}
                onClick={handleBioToggle}>
                    {text.about[lang]}
                </button>
            </div>
            <div className={classes.bio}>
                <Collapse
                in={expandedBio}
                timeout={300}>
                    <p className="bio-text">{creator.bio}</p>
                </Collapse>
            </div>
        </>
    );
}

export default Creator;