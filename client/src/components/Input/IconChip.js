import React from 'react';

import Chip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#2F2E2E',
        padding: '1px 10px',
        height: 28
    },
    label: {
        display: 'none'
    },
    icon: {
        margin: '0 auto',
        color: '#CDCDCD',
    }
}));

/**
 * Ramble chip with only an icon, no label
 * @param {SVGElement} icon - Icon to be displayed
 * @param {Object} props - Any props accepted by MUI
 */
const IconChip = (props) => {
    const classes = useStyles();
    return (
        <Chip icon={props.icon} classes={{
            root: classes.root,
            label: classes.label,
            icon: classes.icon
        }} {...props}/>
    );
}

export default IconChip;