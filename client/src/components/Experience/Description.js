import React from 'react';
import uuid from 'react-uuid';

import {makeStyles} from '@material-ui/core/styles';
import {descriptionStyles} from './ExperienceStyles';
const useStyles = makeStyles(descriptionStyles);

const Description = ({description, includedItems, toBringItems}) => {
    const classes = useStyles();
    return (
        <>
            <h3 className={classes.label}>Planning</h3>
            <p className={classes.text}>{description}</p>
            {includedItems.length > 0 &&
                <div>
                    <h3 className={classes.label}>What's included</h3>
                    <ul className={classes.itemList}>
                        {includedItems.map(item => (
                            <li key={uuid()}>{item}</li>
                        ))}
                    </ul>
                </div>}
            {toBringItems.length > 0 &&
            <div>
                <h3 className={classes.label}>What to bring</h3>
                <ul className={classes.itemList}>
                    {toBringItems.map(item => (
                        <li key={uuid()}>{item}</li>
                    ))}
                </ul>
            </div>}
        </>
    );
}

export default React.memo(Description);