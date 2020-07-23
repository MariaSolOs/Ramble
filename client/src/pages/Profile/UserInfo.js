import React from 'react';
import {connect} from 'react-redux';
import {editProfile} from '../../store/actions/user';
import {useForm} from 'react-hook-form';
import withSnackbar from '../../hoc/withSnackbar';

//Components
import CustomScroll from 'react-custom-scroll';
import FormControl from '@material-ui/core/FormControl';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import TextField from '../../components/Input/TextField';
import Snackbar from './Layout/Snackbar';

//Styles 
import 'react-custom-scroll/dist/customScroll.css';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    formContainer: {
        height: 410,
        margin: '10px 0',
        width: '70%',
        fontFamily: 'Helvetica, sans-serif',
        '& .rcs-custom-scrollbar': {
            opacity: 1,
            paddingBottom: 100
        },
        '& .rcs-inner-handle': {
            background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
        }
    },
    formRow: {
        margin: '15px 0',
        width: '95%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    formGroup: {
        width: '45%'
    },

    //Form labels
    label: {
        fontFamily: 'inherit',
        fontWeight: 'bold',
        fontSize: '1.3rem',
        letterSpacing: '-0.06rem',
        color: 'white'
    },

    submitButton: {
        padding: '1%',
        width: '9rem',
        whiteSpace: 'nowrap',
        borderRadius: '0.7rem',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: '#5E5E5E',
        background: 'radial-gradient(circle at 75%, #32D6A5C5, #1B8A63)',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        border: 'none',
        '&:focus': { outline: 'none' }
    }
}));

//TODO: Add change password and profile picture
const UserInfo = (props) => {
    const classes = useStyles();
    
    //Set form based on saved user fields
    const user = props.user;
    const {register, handleSubmit, getValues} = useForm({defaultValues: {
        fstName: user.fstName,
        lstName: user.lstName,
        photo: user.photo,
        city: user.city,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday
    }});

    const handleUpdate = (updatedInfo) => {
        //Save changes in database
        props.editProfile(updatedInfo, user.id);
        //Display notification
        props.displaySnackbar(`Hey ${getValues('fstName')}! Your profile has been updated.`);
    }

    return (
        <div className={classes.formContainer}>
            <CustomScroll heightRelativeToParent="80%">
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <div className={classes.formRow} style={{ margin: 0 }}>
                        <label htmlFor="fstName" className={classes.label}>Name</label>
                        <button type="submit" className={classes.submitButton}>
                            <BorderColorIcon/>
                            Save changes
                        </button>
                    </div>
                    <div className={classes.formRow}>
                        <FormControl className={classes.formGroup}>
                            <TextField 
                            id="fstName"
                            name="fstName"
                            placeholder="First name"
                            inputRef={register}/>
                        </FormControl>
                        <FormControl className={classes.formGroup}>
                            <TextField 
                            id="lstName"
                            name="lstName"
                            placeholder="Last name"
                            inputRef={register}/>
                        </FormControl>
                    </div>
                    <div className={classes.formRow}>
                        <FormControl className={classes.formGroup}>
                            <label htmlFor="city" className={classes.label}>I live in</label>
                            <TextField
                            id="city" 
                            name="city"
                            inputRef={register}/>
                        </FormControl>
                    </div>
                    <div className={classes.formRow}>
                        <FormControl className={classes.formGroup}>
                            <label htmlFor="email" className={classes.label}>Email</label>
                            <TextField
                            id="email" 
                            name="email"
                            inputRef={register}/>
                        </FormControl>
                    </div>
                    <div className={classes.formRow}>
                        <FormControl className={classes.formGroup}>
                            <label htmlFor="phoneNumber" className={classes.label}>Phone number</label>
                            <TextField
                            id="phoneNumber" 
                            name="phoneNumber"
                            type="tel"
                            inputRef={register}/>
                        </FormControl>
                    </div>
                    <div className={classes.formRow}>
                        <FormControl className={classes.formGroup}>
                            <label htmlFor="birthday" className={classes.label}>Birthday</label>
                            <TextField
                            id="birthday" 
                            name="birthday"
                            type="date"
                            inputRef={register}/>
                        </FormControl>
                    </div>
                </form>
            </CustomScroll>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.data
});
const mapDispatchToProps = (dispatch) => ({
    editProfile: (updatedInfo, id) => dispatch(editProfile(updatedInfo, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(UserInfo, Snackbar));