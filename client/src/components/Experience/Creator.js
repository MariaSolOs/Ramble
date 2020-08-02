import React, {useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    label: {
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        marginBottom: 0
    },
    text: {
        fontSize: '0.97rem',
        letterSpacing: '-0.05rem',
        color: '#C8C8C8',
        lineHeight: 1.4
    },
    
    host: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.5rem 0',
        '& .creator-name': {
            fontSize: '0.9rem',
            letterSpacing: '-0.05rem',
            color: '#CBCBCB',
            margin: '0 10px'
        }
    },
    bioPanel: {
        backgroundColor: '#242424',
        borderRadius: '0.5rem',
        color: '#ECEBE5',
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',
        margin: '0 10px',
        width: '60%',
        '& .MuiExpansionPanelSummary-root.Mui-expanded': {
            minHeight: 50
        },
        '& .MuiExpansionPanelSummary-content': {
            justifyContent: 'center',
            '&.Mui-expanded': { margin: '0 auto' }
        },
        '&.Mui-expanded': {
            margin: '0 10px',
            '& $text': { margin: 0 }
        },
    }
}));

const Creator = ({creator}) => {
    const classes = useStyles();

    //For displaying/hiding creator bio
    const [expandedBio, setExpandedBio] = useState(false);
    const handleBioToggle = () => {
        setExpandedBio(!expandedBio);
    }

    return (
        <><h3 className={classes.label}>Hosted by</h3>
        <div className={classes.host}>
            <Avatar src={creator.user.photo} alt="Experience creator"/>
            <span className="creator-name">{creator.user.fstName}</span>
            <ExpansionPanel expanded={expandedBio} onClick={handleBioToggle}
            classes={{ root: classes.bioPanel }}
            TransitionProps={{ timeout: { enter: 300, exit: 300 }}}>
                <ExpansionPanelSummary 
                aria-controls="bioPanel-content" 
                id="bioPanel-header">
                    About creator
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <p className={classes.text}>{creator.bio}</p>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div></>
    );
}

export default Creator;