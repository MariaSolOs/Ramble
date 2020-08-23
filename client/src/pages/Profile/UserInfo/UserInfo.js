import React, {useState} from 'react';
import {connect} from 'react-redux';
import {editUserProfile, editCreatorProfile} from '../../../store/actions/user';
import AlgoliaPlaces from 'algolia-places-react';

//Components
import CustomScroll from 'react-custom-scroll';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '../../../components/Input/TextField';

//Styles 
import 'react-custom-scroll/dist/customScroll.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './UserInfoStyles';
const useStyles = makeStyles(styles);

const validPhoneReg = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;

const UserInfo = (props) => {
    const classes = useStyles();
    
    //Set form based on saved user fields
    const user = props.user;
    const [values, setValues] = useState({
        fstName: user.fstName,
        lstName: user.lstName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday && user.birthday.split('T')[0],
        city: user.city
    });
    const [phoneErr, setPhoneErr] = useState(false);
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }
    //Handle city change separately
    const handleCityChange = ({suggestion}) => {
        setValues({
            ...values,
            city: suggestion.name
        });
    }
    //If the user is a creator, they can modify their bio
    const [creatorBio, setCreatorBio] = useState(props.creator.bio);
    const handleBioChange = (e) => {
        if(e.target.value.length <= 200) {
            setCreatorBio(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let phoneNumber;
        if(validPhoneReg.test(values.phoneNumber)) {
            phoneNumber = values.phoneNumber.replace(validPhoneReg, '($1) $2-$3');
        } else { 
            setPhoneErr(true);
            return; 
        }
        props.editUserProfile({
            ...values,
            phoneNumber,
            city: user.city !== values.city? values.city : user.city
        });
        //Update creator info if applicable
        if(creatorBio !== props.creator.bio) {
            props.editCreatorProfile({bio: creatorBio}, props.creator.id);
        }
    }

    return (
        <form 
        className={classes.formContainer} 
        onSubmit={handleSubmit}>
            <CustomScroll heightRelativeToParent="80%">
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
                        value={values.fstName}
                        onChange={handleChange}/>
                    </FormControl>
                    <FormControl className={classes.formGroup}>
                        <TextField 
                        id="lstName"
                        name="lstName"
                        placeholder="Last name"
                        value={values.lstName}
                        onChange={handleChange}/>
                    </FormControl>
                </div>
                <div className={classes.formRow}>
                    <FormControl className={classes.formGroup}>
                        <label htmlFor="city" className={classes.label}>
                            I live in
                        </label>
                        <AlgoliaPlaces
                        placeholder=""
                        defaultValue={user.city}
                        options={{
                            appId: process.env.REACT_APP_ALGOLIA_APP_ID,
                            apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
                            type: 'city',
                            aroundLatLngViaIP: false,
                            hitsPerPage: 3
                        }}
                        onChange={handleCityChange}
                        onClear={() => setValues({...values, city: user.city})}/>
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
                        value={values.email}
                        onChange={handleChange}/>
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
                        helperText={phoneErr && 
                                    'Please enter a valid phone number'}/>
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
                        value={values.birthday}
                        onChange={handleChange}/>
                    </FormControl>
                </div>
                {props.creator.id &&
                    <div className={classes.formRow} style={{ flexDirection: 'column' }}>
                        <label htmlFor="creatorBio" className={classes.label}>
                            About you
                        </label>
                        <TextField 
                        multiline 
                        rows={3} 
                        rowsMax={3}
                        id="creatorBio"
                        value={creatorBio}
                        onChange={handleBioChange}
                        fullWidth
                        endadornment={<InputAdornment position="end">
                                        {200 - creatorBio.length}
                                      </InputAdornment>}/>
                    </div>}
            </CustomScroll>
            <button type="submit" className={classes.submitButton}>
                Save changes
            </button>
        </form>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.profile,
    creator: state.user.creator
});
const mapDispatchToProps = (dispatch) => ({
    editUserProfile: (updatedInfo) => 
        dispatch(editUserProfile(updatedInfo, true)),
    editCreatorProfile: (updatedInfo, creatorId) => 
        dispatch(editCreatorProfile(updatedInfo, creatorId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);