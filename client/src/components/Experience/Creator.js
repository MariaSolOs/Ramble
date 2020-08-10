import React, {useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    label: {
        fontSize: '1.2rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        marginBottom: 0
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

    bioToggler: {
        backgroundColor: '#242424',
        borderRadius: '0.5rem',
        color: '#ECEBE5',
        font: 'inherit',
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',
        border: 'none',
        marginLeft: 15,
        padding: '0.8rem 0.9rem',
        width: 130,
        cursor: 'pointer',
        '&:focus': { outline: 'none' }
    },

    bio: { 
        display: 'flex',
        '& .bio-text': {
            fontSize: '0.97rem',
            letterSpacing: '-0.05rem',
            color: '#C8C8C8',
            lineHeight: 1.4,
            margin: '0.5rem 0'
        } 
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
        <>
            <h3 className={classes.label}>Hosted by</h3>
            <div className={classes.host}>
                <Avatar src={creator.user.photo} alt="Experience creator"/>
                <span className="creator-name">{creator.user.fstName}</span>
                <button 
                className={classes.bioToggler}
                onClick={handleBioToggle}>
                    About creator
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