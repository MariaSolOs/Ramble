import React, {useState, useContext} from 'react';
import {AdminContext} from '../../../context/adminContext';
import {useForm} from 'react-hook-form';

import TextField from '../../../components/Input/TextField';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        minWidth: 350,
        margin: '20vh auto 0',
        padding: '0 40px 20px',
        borderRadius: '0.7rem',
        border: '1px solid #C5C5C5',
        alignItems: 'center',
    },
    title: {
       fontFamily: 'Helvetica, sans-serif',
       letterSpacing: '-0.05rem',
       fontSize: '1.3rem',
       color: '#FFF' 
    }
}));

const Auth = (props) => {
    const classes = useStyles();

    //Switch between log in and sign up
    const adminContext = useContext(AdminContext);
    const [showLogIn, setShowLogIn] = useState(true)
    const {register, handleSubmit} = useForm();

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>
                {showLogIn? 
                'Please log in with your Ramble admin profile' : 
                'Register a new user'}
            </h2>
            <form>
                <TextField 
                label="Username"
                fullWidth
                style={{ marginBottom: '2rem' }}
                name="username"
                inputRef={register({ required: true })}/>
                <TextField 
                label="Password"
                fullWidth
                name="password"
                inputRef={register({ required: true })}/>
            </form>
        </div>
    );
}

export default Auth;