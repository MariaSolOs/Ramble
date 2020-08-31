import React, {useState} from 'react';
import axios from '../../../tokenizedAxios';
import {useDispatch} from 'react-redux';
import {showSnackbar} from '../../../store/actions/ui';

import TextField from '../../../components/Input/TextField/TextField';
import Checkbox from '../../../components/Input/Checkbox/Checkbox';
import Button from '@material-ui/core/Button';

import {makeStyles} from '@material-ui/core/styles';
import styles from './RegisterStyles'
const useStyles = makeStyles(styles);

const initForm = {
    username: '',
    password: '',
    addAdmin: false,
    approveExp: false
}

const Register = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    //Registration form
    const [values, setValues] = useState({...initForm});
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.name.includes('perm-')? e.target.checked :
                             e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const permissions = [];
        if(values['perm-approveExp']) {
            permissions.push('approveExp');
        }
        if(values['perm-seeReviews']) {
            permissions.push('seeReviews');
        }
        axios.post('/api/auth/admin-register', {
            username: values.username, 
            password: values.password,
            permissions
        })
        .then(res => {
            dispatch(showSnackbar('Successfully created admin 🥳'));
        })
        .catch(err => {
            dispatch(showSnackbar(`FUUUUCKKKK ${err} 🤖`));
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
                    Give experience approval permissions
                    <Checkbox 
                    name="perm-approveExp"
                    onChange={handleChange}/>
                </div>
                <div className={classes.permissionField}>
                    Give review permissions
                    <Checkbox 
                    name="perm-seeReviews"
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