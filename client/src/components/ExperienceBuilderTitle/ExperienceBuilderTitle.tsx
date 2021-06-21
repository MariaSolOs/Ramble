import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ExperienceBuilderTitle.styles';
const useStyles = makeStyles(styles);

type Props = {
    className?: string;
}

const ExperienceBuilderTitle: React.FC<React.HTMLAttributes<HTMLTitleElement> & Props> = (props) => {
    const classes = useStyles();

    return (
        <h2 className={`${classes.root} ${props.className}`}>
            { props.children }
        </h2>
    );
}

export default React.memo(ExperienceBuilderTitle);