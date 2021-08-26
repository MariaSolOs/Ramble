import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useLogInMutation } from 'graphql-api';
import { initCache } from 'apollo-cache';
import useSnackbarContext from 'context/snackbarContext';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from 'components/TextField/TextField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './LogInForm.styles';
const useStyles = makeStyles(styles);

const LogInForm = () => {
    const { showSnackbar } = useSnackbarContext();
    const classes = useStyles();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const [logIn] = useLogInMutation({
        onCompleted: ({ logIn }) => {
            initCache(logIn.token);
            history.push('/approve-exp');
        },
        onError: ({ graphQLErrors }) => {
            const message = graphQLErrors[0].message || "We can't log you in...";
            showSnackbar(message);
        }
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        logIn({ variables: { userName, password }});
    }

    return (
        <div className={classes.background}>
            <Paper elevation={4} className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <h2 className={classes.title}>
                        Ramble Admin Dashboard
                    </h2>
                    <FormControl fullWidth className={classes.formControl}>
                        <FormLabel htmlFor="userName">User name</FormLabel>
                        <TextField
                        id="userName"
                        required
                        value={userName}
                        onChange={e => setUserName(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                        id="password"
                        required
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    </FormControl>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    fullWidth>
                        Log in
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default LogInForm;