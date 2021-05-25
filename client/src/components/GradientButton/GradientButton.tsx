import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './GradientButton.styles';
const useStyles = makeStyles(styles);

export type Props = {
    rambleButtonType: 'experience' | 'creator'
}

const GradientButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & Props> = (props) => {
    const classes = useStyles(props);

    return (
        <button className={`${classes.root} ${props.className}`}>
            { props.children }
        </button>
    );
}

export default GradientButton;