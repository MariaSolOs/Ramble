import React, {useState} from 'react';
import axios from '../../tokenizedAxios';

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

const initForm = {
    username: '',
    password: '',
    addAdmin: false,
    approveExp: false
}

const Register = (props) => {
    const classes = useStyles();

    //Registration form
    const [values, setValues] = useState({...initForm});
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: (e.target.name === 'addAdmin' ||
                              e.target.name === 'approveExp')? e.target.checked :
                              e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const permissions = [];
        if(values.addAdmin) {
            permissions.push('addAdmin');
        }
        if(values.approveExp) {
            permissions.push('approveExp');
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
        setValues({...initForm});
    }

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>
                Register a new user
            </h2>
            <form onSubmit={handleSubmit}>
                <TextField 
                label="Username"
                fullWidth
                style={{ marginBottom: '2rem' }}
                name="username"
                value={values.username}
                onChange={handleChange}
                required/>
                <TextField 
                label="Password"
                fullWidth
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                required/>
                <div className={classes.permissionField}>
                    Give admin registration permissions
                    <Checkbox 
                    name="addAdmin"
                    onChange={handleChange}/>
                </div>
                <div className={classes.permissionField}>
                    Give experience approval permissions
                    <Checkbox 
                    name="approveExp"
                    onChange={handleChange}/>
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