import React from 'react';

import NavRow from './NavRow/NavRow';

import { makeStyles } from '@material-ui/core/styles';
import styles from './LayoutStyles';
const useStyles = makeStyles(styles);

const Layout = ({ lang, children }) => {
    const classes = useStyles(); 

    return (
        <div className={classes.root}>
            <div className={classes.shadowSeparator} />
            <div className={classes.page}>
                <NavRow lang={lang} />
                { children }
            </div>
        </div>
    );
}

export default React.memo(Layout);