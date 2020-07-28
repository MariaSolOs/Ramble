import React, {useState} from 'react';
import {connect} from 'react-redux';
import {adminAuth} from '../../../store/actions/user';
import {useForm} from 'react-hook-form';

import TextField from '../../../components/Input/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        minWidth: 350,
        margin: '20vh auto 0',
        padding: '0 40px 10px',
        borderRadius: '0.7rem',
        border: '1px solid #C5C5C5',
        alignItems: 'center',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },
    title: {
       font: 'inherit',
       fontSize: '1.3rem',
       color: '#FFF',
       textAlign: 'center'
    },
    switch: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        width: '55%',
        marginTop: 10,
        '& p': {
            font: 'inherit',
            fontSize: '0.9rem',
            color: '#FFF',
            margin: '7px 0' 
        }
    },
    submitButton: {
        width: 'fit-content',
        margin: '10px auto 0',
        '& button': {
            font: 'inherit'
        }
    }
}));

const Auth = (props) => {
    const classes = useStyles();

    //Switch between log in and sign up
    const [inRegister, setInRegister] = useState(false)
    const {register, handleSubmit} = useForm();

    const handleAuthSwitch = (e) => { setInRegister(e.target.checked); }

    const handleAuth = (info) => {
        const authType = inRegister? 'register' : 'login';
        props.adminAuth(info, authType);
    }

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>
                {inRegister? 
                'Register a new user' :
                'Please log in with your Ramble admin profile'}
            </h2>
            <form onSubmit={handleSubmit(handleAuth)}>
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
                type="password"
                inputRef={register({ required: true })}/>
                <div className={classes.submitButton}>
                    <Button 
                    variant="contained" 
                    type="submit">
                        {inRegister? 'Register' : 'Log in'}
                    </Button>
                </div>
            </form>
            <div className={classes.switch}>
                <p>{inRegister? 'Log in' : 'Register a new admin'}</p>
                <Switch color="default" onChange={handleAuthSwitch}/>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    adminAuth: (info, authType) => dispatch(adminAuth(info, authType))
});

export default connect(null, mapDispatchToProps)(Auth);