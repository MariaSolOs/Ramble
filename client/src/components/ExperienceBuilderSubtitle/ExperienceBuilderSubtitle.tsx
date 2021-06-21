import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ExperienceBuilderSubtitle.styles';
const useStyles = makeStyles(styles);

type Props = {
    className?: string;
}

const ExperienceBuilderSubtitle: React.FC<React.HTMLAttributes<HTMLTitleElement> & Props> = (props) => {
    const classes = useStyles();

    return (
        <h4 className={`${classes.root} ${props.className}`}>
            { props.children }
        </h4>
    );
}

export default ExperienceBuilderSubtitle;