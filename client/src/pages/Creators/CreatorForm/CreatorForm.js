import React, {useState} from 'react';
import {connect} from 'react-redux';
import {upgradeToCreator} from '../../../store/actions/user';
import {useHistory} from 'react-router-dom';
import Files from 'react-butterfiles';

//Components
import Tip from '../../../components/Tip';
import TextField from '../../../components/Input/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {faLock} from '@fortawesome/free-solid-svg-icons/faLock';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './CreatorFormStyles';
const useStyles = makeStyles(styles);

const idSides = [
    { side: 'front',
      message: 'Show the front of your ID' },
    { side: 'back',
      message: 'Add the back of your ID' }
];
const validPhoneReg = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;

//TODO: Hide this form from logged in creators
const CreatorForm = (props) => {
    const classes = useStyles();

    //Creator bio
    const [bio, setBio] = useState('');
    const handleBioChange = (e) => {
        if(e.target.value.length <= 200) {
            setBio(e.target.value);
        }
    }
    //Phone number
    const [phoneNumber, setPhoneNumber] = useState(props.userPhone);
    const [phoneErr, setPhoneErr] = useState(false);
    const handlePhoneChange = (e) => { setPhoneNumber(e.target.value); }

    //ID dropzone
    const [id, setId] = useState({front: null, back: null});
    const [side, setSide] = useState('front');
    const handleAddId = (files) => { 
        setId(id => ({...id, [side]: files[0].src.base64 }));
    }
    const handleDeleteId = (side) => () => { 
        setId(id => ({...id, [side]: null }));
    }

    //Form validation and submission
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validPhoneReg.test(phoneNumber)) {
            return setPhoneErr(true);
        }
        props.upgradeToCreator({ 
            bio, 
            phoneNumber: phoneNumber.replace(validPhoneReg, '($1) $2-$3'),
            id: [id.front, id.back]
        });
        history.push(props.backFromCreation? '/experience/new/submitted' :
                    '/experience/new/intro');
    }

    //If user decides to fill the form after the experience creation
    const handleSkip = (e) => { 
        e.preventDefault();
        history.push('/experience/new/intro'); 
    }
    
    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <div className={classes.header}>
                <div className="gradient"/>
                <div>
                    <h2 className={classes.title}>{props.userName},</h2>
                    <h3 className={classes.subtitle}>
                        Before giving life to your experience we would like to get to 
                        know you a little bit better.
                    </h3>
                </div>
            </div>
            <div className={classes.aboutField}>
                <label className={classes.title} htmlFor="bio">About you</label>
                <h3 className={classes.subtitle}>
                    Tell us a bit about yourself. How would your friends describe you?
                </h3>
                <Tip>
                    Include fun facts, what you're passionate about, your professional 
                    experience and other pertinent information.
                </Tip>
                <TextField 
                multiline 
                rows={3} 
                rowsMax={3}
                id="bio" 
                value={bio} 
                required 
                onChange={handleBioChange}
                fullWidth
                endadornment={<InputAdornment position="end">
                                {200 - bio.length}
                              </InputAdornment>}/>
            </div>
            <div className={classes.phoneField}>
                <label className={classes.title} htmlFor="phone-number">
                    What's your phone number?
                </label>
                <h3 className={classes.subtitle}>
                    Only us and guests who book your experience will have access to 
                    your phone number.
                </h3>
                <TextField 
                error={phoneErr}
                helperText={phoneErr && 'Please provide a valid phone number'}
                id="phone-number"
                required
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}/>
            </div>
            <div>
                <label className={classes.title} htmlFor="government-id">
                    Government ID
                </label>
                <h3 className={classes.subtitle}>
                    That just allows us to check if it's really you. By verifying the 
                    identity of guests and Creators, we make sure everyone feels safe.
                </h3>
                <div className={classes.idTips}>
                    <Tip icon={faLock}>
                        Your ID won’t be shared with anyone else.
                    </Tip>
                    <Tip>
                        Please upload an ID with your picture on it, like your 
                        driver's license, passport or identity card. We accept 
                        .jpg, .jpeg or .png files.
                    </Tip>
                </div>
                <Files
                multiple
                convertToBase64
                accept={['image/jpg', 'image/jpeg', 'image/png']}
                onSuccess={handleAddId}>
                {({browseFiles, getDropZoneProps}) => (
                    <div {...getDropZoneProps({className: classes.dropzone})}>
                        {idSides.map(({side, message}) => (
                            <div className={classes.dropzoneItem} key={side}>
                                <div className={classes.itemsDetails}>
                                    <p>{side}</p>
                                    <p>{message}</p>
                                </div>
                                <div className={classes.dropzoneImg}>
                                    {id[side] && <HighlightOffIcon 
                                                  className={classes.deleteIcon}
                                                  onClick={handleDeleteId(side)}/>}
                                    {id[side] ? 
                                        <img src={id[side]} alt="Submitted ID"/> :
                                        <div className={classes.addID}>
                                            <AddCircleIcon 
                                            className="icon" 
                                            onClick={browseFiles}
                                            onMouseEnter={() => setSide(side)}/>
                                            <p className="msg">Add {side}</p>
                                        </div>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </Files>
            </div>
            <button
            type="submit"
            disabled={bio.length === 0 || 
                      phoneNumber.length === 0 ||  
                      !id.front || !id.back}
            className={`${classes.submitButton} ${classes.gradientButton}`}>
                Done
            </button>
            {!props.backFromCreation &&
                <button
                type="submit"
                className={`${classes.doLaterButton} ${classes.gradientButton}`}
                onClick={handleSkip}>
                    Do this later 
                </button>}
        </form>
    );
}

const mapStateToProps = (state) => ({
    userName: state.user.profile.fstName,
    userPhone: state.user.profile.phoneNumber,
    backFromCreation: Object.keys(state.exp.savedExperienceForm).length > 0,
    creatorRegistered: state.user.creator.id !== null
});
const mapDispatchToProps = (dispatch) => ({
    upgradeToCreator: (info) => dispatch(upgradeToCreator(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatorForm);