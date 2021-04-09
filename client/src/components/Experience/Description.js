import React from 'react';
import uuid from 'react-uuid';
import { DescriptionText as text } from './ExperienceText';

import { makeStyles } from '@material-ui/core/styles';
import { descriptionStyles } from './ExperienceStyles';
const useStyles = makeStyles(descriptionStyles);

const Description = ({ description, includedItems, toBringItems, lang }) => {
    const classes = useStyles();

    return (
        <>
            <h3 className={classes.label}>{text.planning[lang]}</h3>
            <p className={classes.text}>{description}</p>
            {includedItems.length > 0 &&
                <div>
                    <h3 className={classes.label}>{text.included[lang]}</h3>
                    <ul className={classes.itemList}>
                        {includedItems.map(item => (
                            <li key={uuid()}>{item}</li>
                        ))}
                    </ul>
                </div>}
            {toBringItems.length > 0 &&
            <div>
                <h3 className={classes.label}>{text.bring[lang]}</h3>
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