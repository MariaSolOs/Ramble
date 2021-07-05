import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './GradientButton.styles';
const useStyles = makeStyles(styles);

export type Props = {
    variant: 'experience' | 'creator'
}

const GradientButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & Props> = (props) => {
    const classes = useStyles(props);

    return (
        <button { ...props } className={`${props.className} ${classes.root}`}>
            { props.children }
        </button>
    );
}

export default GradientButton;