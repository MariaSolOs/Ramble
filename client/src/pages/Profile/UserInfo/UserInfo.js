import React, {useState} from 'react';
import {connect} from 'react-redux';
import {editUserProfile, editCreatorProfile} from '../../../store/actions/user';
import {useForm} from 'react-hook-form';
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
    const {register, handleSubmit, errors} = useForm({defaultValues: {
        fstName: user.fstName,
        lstName: user.lstName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday && user.birthday.split('T')[0]
    }});

    //Handle city change separately
    const [city, setCity] = useState(user.city);
    const handleCityChange = ({suggestion}) => {
        setCity(suggestion.name);
    }

    //If the user is a creator, they can modify their bio
    const [creatorBio, setCreatorBio] = useState(props.creator.bio);
    const handleBioChange = (e) => {
        if(e.target.value.length <= 200) {
            setCreatorBio(e.target.value);
        }
    }

    const onSubmit = (data) => {
        if(validPhoneReg.test(data.phoneNumber)) {
            data.phoneNumber = data.phoneNumber.replace(validPhoneReg, '($1) $2-$3');
        } else { return; }
        props.editUserProfile({
            ...data,
            city: user.city !== city? city : user.city
        });
        //Update creator info if applicable
        if(creatorBio !== props.creator.bio) {
            props.editCreatorProfile({bio: creatorBio}, props.creator.id);
        }
    }

    return (
        <form 
        className={classes.formContainer} 
        onSubmit={handleSubmit(onSubmit)}>
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
                        onClear={() => setCity(user.city)}/>
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
                {props.creator.id &&
                    <div className={classes.formRow} style={{ display: 'block' }}>
                        <label htmlFor="creatorBio" className={classes.label}>
                            Bio
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