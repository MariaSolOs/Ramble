import React from 'react';

import NavRow from './NavRow';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        minHeight: '70vh',
        width: '90%',
        margin: '13vh auto 5vh'
    },
    page: {
        width: 'calc(100% - 10px - 3%)'
    },
    shadowSeparator: {
        padding: 5,
        borderRadius: '2rem',
        marginRight: '3%',
        background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
    }
}));

const Layout = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.shadowSeparator}/>
            <div className={classes.page}>
                <NavRow/>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;