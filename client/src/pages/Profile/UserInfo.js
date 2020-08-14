import React from 'react';
import {connect} from 'react-redux';
import {editProfile} from '../../store/actions/user';
import {useForm} from 'react-hook-form';

//Components
import CustomScroll from 'react-custom-scroll';
import FormControl from '@material-ui/core/FormControl';
import TextField from '../../components/Input/TextField';

//Styles 
import 'react-custom-scroll/dist/customScroll.css';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    formContainer: {
        height: 410,
        margin: '10px 0',
        width: '70%',
        minWidth: 550,
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
        fontSize: '1.2rem',
        letterSpacing: '-0.06rem',
        color: 'white'
    },

    submitButton: {
        padding: '0.7rem 1rem',
        whiteSpace: 'nowrap',
        borderRadius: '0.7rem',
        color: '#FFF',
        background: 'radial-gradient(circle at 75%, #32D6A5C5, #1B8A63)',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        border: 'none',
        cursor: 'pointer',
        float: 'right',
        margin: '0.5rem 1rem 0 0',
        '&:focus': { outline: 'none' }
    }
}));

const validPhoneReg = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;

const UserInfo = (props) => {
    const classes = useStyles();
    
    //Set form based on saved user fields
    const user = props.user;
    const {register, handleSubmit, errors} = useForm({defaultValues: {
        fstName: user.fstName,
        lstName: user.lstName,
        city: user.city,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday && user.birthday.split('T')[0]
    }});

    const onSubmit = (data) => {
        if(validPhoneReg.test(data.phoneNumber)) {
            data.phoneNumber = data.phoneNumber.replace(validPhoneReg, '($1) $2-$3');
        } else { return; }
        props.editProfile(data);
    }

    return (
        <form 
        className={classes.formContainer} 
        onSubmit={handleSubmit(onSubmit)}>
            <CustomScroll heightRelativeToParent="80%">
                <div>
                    <div className={classes.formRow} style={{ marginBottom: -15 }}>
                        <label htmlFor="fstName" className={classes.label}>
                            Name
                        </label>
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
                            <label htmlFor="city" className={classes.label}>
                                I live in
                            </label>
                            <TextField
                            id="city" 
                            name="city"
                            inputRef={register}/>
                        </FormControl>
                    </div>
                    <div className={classes.formRow}>
                        <FormControl className={classes.formGroup}>
                            <label htmlFor="email" className={classes.label}>
                                Email
                            </label>
                            <TextField
                            id="email" 
                            name="email"
                            inputRef={register}/>
                        </FormControl>
                    </div>
                    <div className={classes.formRow}>
                        <FormControl className={classes.formGroup}>
                            <label htmlFor="phoneNumber" className={classes.label}>
                                Phone number
                            </label>
                            <TextField
                            id="phoneNumber" 
                            name="phoneNumber"
                            type="tel"
                            error={errors.phoneNumber}
                            helperText={errors.phoneNumber && 
                                        'Please enter a valid phone number'}
                            inputRef={register({pattern: validPhoneReg})}/>
                        </FormControl>
                    </div>
                    <div className={classes.formRow}>
                        <FormControl className={classes.formGroup}>
                            <label htmlFor="birthday" className={classes.label}>
                                Birthday
                            </label>
                            <TextField
                            id="birthday" 
                            name="birthday"
                            type="date"
                            inputRef={register}/>
                        </FormControl>
                    </div>
                </div>
            </CustomScroll>
            <button type="submit" className={classes.submitButton}>
                Save changes
            </button>
        </form>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.profile
});
const mapDispatchToProps = (dispatch) => ({
    editProfile: (updatedInfo) => dispatch(editProfile(updatedInfo, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);