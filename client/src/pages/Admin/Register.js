import React from 'react';
import axios from '../../tokenizedAxios';
import {useForm} from 'react-hook-form';

import TextField from '../../components/Input/TextField';
import Checkbox from '../../components/Input/Checkbox';
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
        color: '#FFF',
        letterSpacing: '-0.05rem'
    },
    title: {
       font: 'inherit',
       fontSize: '1.3rem',
       textAlign: 'center'
    },
    submitButton: {
        width: 'fit-content',
        margin: '10px auto 0',
        '& button': {
            font: 'inherit'
        }
    },
    permissionField: { marginTop: 10 }
}));


const Register = (props) => {
    const classes = useStyles();

    //For managing registration
    const {register, handleSubmit, reset} = useForm();
    const onSubmit = (values) => {
        const permissions = [];
        for(const perm in values.permissions) {
            if(values.permissions[perm]) {
                permissions.push(perm);
            }
        }
        axios.post('/api/auth/admin-register', {
            username: values.username, 
            password: values.password,
            permissions
        })
        .then(res => {
            props.showSnackbar('Successfully created admin 🥳');
        })
        .catch(err => {
            props.showSnackbar(`FUUUUCKKKK ${err} 🤖`);
        });
        reset({});
    }

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>
                Register a new user
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                label="Username"
                fullWidth
                style={{ marginBottom: '2rem' }}
                name="username"
                inputRef={register({ required: true })}/>
                <TextField 
                label="Password"
                fullWidth
                type="password"
                name="password"
                inputRef={register({ required: true })}/>
                <div className={classes.permissionField}>
                    Give admin registration permissions
                    <Checkbox 
                    name="permissions.addAdmin" 
                    inputRef={register}/>
                </div>
                <div className={classes.permissionField}>
                    Give experience approval permissions
                    <Checkbox 
                    name="permissions.approveExp"
                    inputRef={register}/>
                </div>
                <div className={classes.submitButton}>
                    <Button variant="contained" type="submit">
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
}


export default Register;