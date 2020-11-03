import React from 'react';

import Fab from '@material-ui/core/Fab';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShareSquare} from '@fortawesome/free-solid-svg-icons/faShareSquare';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';

import {makeStyles} from '@material-ui/core/styles';
import styles from './ShareSaveButtonsStyles';
const useStyles = makeStyles(styles);

/**
 * Share and media buttons
 * @param {Boolean} showSave - If true, show save button 
 * @param {Boolean} saved - If true, heart is red
 * @param {Function} onSave - Callback for save button
 * @param {Function} onShare - Callback for share button
 */
const ShareSaveButtons = ({saved, showSave, onSave, onShare}) => {
    const classes = useStyles({saved});

    //TODO: Add share to media links
    return (
        <div className={classes.container}>
            <Fab size="small" aria-label="share" disableRipple
            className={classes.floatButton}
            onClick={onShare}>
                <FontAwesomeIcon icon={faShareSquare}/>
            </Fab>
            {showSave && 
                <Fab size="small" aria-label="favorite" disableRipple
                className={`${classes.floatButton} saveButton`} 
                onClick={onSave}>
                    <FontAwesomeIcon icon={faHeart}/>
                </Fab>}
        </div>
    );
}

export default React.memo(ShareSaveButtons);