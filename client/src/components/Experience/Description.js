import React from 'react';
import uuid from 'react-uuid';

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
    includedItems: {
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        color: '#C8C8C8',
        listStylePosition: 'inside',
        padding: 0,
        marginTop: '0.5rem',
        textTransform: 'capitalize',
        '& li': {
            padding: '0.2rem 0'
        }
    }
}));
const Description = ({description, includedItems}) => {
    const classes = useStyles();
    return (
        <>
            <h3 className={classes.label}>Planning</h3>
            <p className={classes.text}>{description}</p>
            <h3 className={classes.label}>What's included</h3>
            <ul className={classes.includedItems}>
                {includedItems.map(item => (
                    <li key={uuid()}>{item}</li>
                ))}
            </ul>
        </>
    );
}

export default React.memo(Description);