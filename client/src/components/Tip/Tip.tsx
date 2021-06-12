import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Tip.styles';
const useStyles = makeStyles(styles);

type Props = {
    icon?: IconDefinition;
    className?: string;
}

const Tip: React.FC<React.HTMLAttributes<HTMLParagraphElement> & Props> = (props) => {
    const classes = useStyles();

    return (
        <p className={`${classes.root} ${props.className}`}>
            <FontAwesomeIcon className={classes.icon} icon={props.icon || faLightbulb} />
            { props.children }
        </p>
    );
}

export default React.memo(Tip);