import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import { useLanguageContext } from 'context/languageContext';
import { useAppDispatch } from 'hooks/redux';
import { openErrorDialog } from 'store/uiSlice';
import { updateUIProfile } from 'store/userSlice';

import InputAdornment from '@material-ui/core/InputAdornment';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import StripeMessage from './StripeMessage';
import Spinner from 'components/Spinner/Spinner';
import Dropzone from 'components/Dropzone/Dropzone';
import TextField from 'components/TextField/TextField';
import Tip from 'components/Tip/Tip';
import Button from 'components/GradientButton/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreatorForm.styles';
const useStyles = makeStyles(styles);

const GET_PROFILE = gql`
    query getProfile {
        me {
            _id
            firstName
            phoneNumber
            photo
        }
    }
`;

const SIGN_UP_CREATOR = gql`
    mutation signUpCreator($bio: String!, $governmentIds: [String!]!) {
        signUpCreator(bio: $bio, governmentIds: $governmentIds) {
            _id
        }
    }
`;

const EDIT_USER = gql`
    mutation editUser($phoneNumber: String, $photo: String) {
        editUser(phoneNumber: $phoneNumber, photo: $photo) {
            _id
            photo
        }
    }
`;

type ProfileDetails = {
    _id: string;
    firstName: string;
    phoneNumber: string;
    photo: string;
}

type SignUpCreatorVariables = {
    bio: string;
    governmentIds: string[];
}

type SignUpCreatorDetails = {
    _id: string;
}

type EditUserVariables = {
    phoneNumber?: string; 
    photo?: string;
}

type EditUserDetails = {
    _id: string;
    photo: string;
}

type PreviewableFile = { 
    file: File; 
    preview: string; 
} | null;

const VALID_PHONE_NUMBER_REG = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
const MAX_BIO_LENGTH = 500;

const CreatorForm = () => {
    const { CreatorForm: text } = useLanguageContext().appText;
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const [profilePic, setProfilePic] = useState<PreviewableFile>(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [bio, setBio] = useState('');
    const [frontId, setFrontId] = useState<PreviewableFile>(null);
    const [backId, setBackId] = useState<PreviewableFile>(null);
    const [uploading, setUploading] = useState(false);

    const { loading, data } = useQuery<{ me: ProfileDetails }>(GET_PROFILE, {
        onCompleted: ({ me }) => {
            setPhoneNumber(me.phoneNumber || '');
        }
    });
    const [
        editUser, 
        { loading: editUserLoading }
    ] = useMutation<{ editUser: EditUserDetails }, EditUserVariables>(EDIT_USER, {
        onError: () => {
            dispatch(openErrorDialog({ message: "We couldn't update your profile..." }));
        },
        onCompleted: ({ editUser }) => {
            dispatch(updateUIProfile({ photo: editUser.photo }));
        }
    });
    const [
        signUpCreator,
        { data: creatorData }
    ] = useMutation<{ signUpCreator: SignUpCreatorDetails}, SignUpCreatorVariables>(SIGN_UP_CREATOR, {
        onError: () => {
            dispatch(openErrorDialog({ message: "We couldn't create your creator profile..." }));
        }
    });

    const handleCreatePreview = useCallback((setter: React.Dispatch<React.SetStateAction<any>>, files: File[]) => {
        setter({ file: files[0], preview: URL.createObjectURL(files[0]) });
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setUploading(true);

        // Check if phone number is valid
        if (!VALID_PHONE_NUMBER_REG.test(phoneNumber)) {
            setPhoneError(true);
            setUploading(false);
            return;
        }

        let photoUrl = '';
        const governmentIds = [];

        // Upload profile picture if the user didn't have one
        if (!data!.me.photo) {
            const photoData = new FormData();
            photoData.append('file', profilePic!.file);
            photoData.append('upload_preset', 'RAMBLE-users');
            photoData.append('public_id', data!.me._id);

            const { secure_url } = await fetch(process.env.REACT_APP_CLOUDINARY_API_URI!, {
                method: 'POST',
                body: photoData
            }).then(res => res.json());
            photoUrl = secure_url;
        }

        // Upload IDs
        const idData1 = new FormData();
        idData1.append('file', frontId!.file);
        idData1.append('upload_preset', 'RAMBLE-creators');
        const { secure_url: idUrl1 } = await fetch(process.env.REACT_APP_CLOUDINARY_API_URI!, {
            method: 'POST',
            body: idData1
        }).then(res => res.json());
        governmentIds.push(idUrl1);

        const idData2 = new FormData();
        idData2.append('file', backId!.file);
        idData2.append('upload_preset', 'RAMBLE-creators');
        const { secure_url: idUrl2 } = await fetch(process.env.REACT_APP_CLOUDINARY_API_URI!, {
            method: 'POST',
            body: idData2
        }).then(res => res.json());
        governmentIds.push(idUrl2);

        // Sign up creator
        signUpCreator({ variables: { bio, governmentIds }});

        // Update user information if needed
        if (profilePic || data!.me.phoneNumber !== phoneNumber) {
            editUser({ 
                variables: {
                    ...profilePic && { photo: photoUrl },
                    ...data!.me.phoneNumber !== phoneNumber && { 
                        phoneNumber: phoneNumber.replace(VALID_PHONE_NUMBER_REG, '($1) $2-$3') 
                    }
                }
            });
        }
    }

    // Revoke data URIs to avoid memory leaks
    useEffect(() => {
        return () => {
            if (profilePic) {
                URL.revokeObjectURL(profilePic.preview);
            }
            if (frontId) { 
                URL.revokeObjectURL(frontId.preview);
            }
            if (backId) { 
                URL.revokeObjectURL(backId.preview);
            }
        }
    }, [profilePic, frontId, backId]);

    // Stop the spinner when both mutations are completed
    useEffect(() => {
        if (creatorData && !editUserLoading) {
            // Stop the spinner
            setUploading(false);
        }
    }, [creatorData, editUserLoading]);

    if (loading || !data) {
        return <Spinner />; 
    }

    // When the form was successfully submitted, start Stripe onboarding
    if (creatorData && !editUserLoading) {
        return <StripeMessage creatorId={creatorData.signUpCreator._id} />;
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            {uploading && <Spinner />}
            <div className={classes.formContent}>
                <div className={classes.header}>
                    <div className={classes.headerGradient} />
                    <div>
                        <h2 className={classes.title}>{data.me.firstName},</h2>
                        <h3 className={classes.subtitle}>{text.headerTitle}</h3>
                    </div>
                </div>
                {!data.me.photo &&
                    <>
                        <div>
                            <h2 className={classes.title}>{text.profilePicture}</h2>
                            <h5 className={classes.subtitle}>{text.showSmile}</h5>
                        </div>
                        {profilePic ? 
                            <div className={classes.photoPreviewContainer}>
                                <HighlightOffIcon 
                                className={classes.deleteIcon}
                                onClick={() => setProfilePic(null)} />
                                <img 
                                className={classes.photoPreview} 
                                src={profilePic.preview} 
                                alt="Ramble creator" />
                            </div> : 
                            <Dropzone 
                            className={classes.photoDropzone}
                            iconComponent={AddCircleIcon}
                            iconClassName={classes.addIcon}
                            extraOptions={{
                                onDrop: files => handleCreatePreview(setProfilePic, files)
                            }} />}
                    </>}
                <div className={classes.fieldContainer}>
                    <h2 className={classes.title}>{text.aboutYouTitle}</h2>
                    <h5 className={classes.subtitle}>{text.aboutYouSubtitle}</h5>
                    <Tip className={classes.tip}>{text.aboutYouTip}</Tip>
                    <TextField
                    multiline 
                    rows={4} 
                    rowsMax={4}
                    required
                    className={classes.aboutYouTextField}
                    value={bio}
                    onChange={e => {
                        if (e.target.value.length <= MAX_BIO_LENGTH) {
                            setBio(e.target.value);
                        }
                    }}
                    inputprops={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {MAX_BIO_LENGTH - bio.length}
                            </InputAdornment>
                        )
                    }} />
                </div>
                <h2 className={classes.title}>{text.phoneNumberTitle}</h2>
                <h5 className={classes.subtitle}>{text.phoneNumberSubtitle}</h5>
                <TextField
                required
                type="tel"
                placeholder="(123) 456-7890"
                className={classes.phoneTextField}
                value={phoneNumber}
                helperText={phoneError && text.phoneNumberError}
                onChange={e => setPhoneNumber(e.target.value)} />
                <div className={classes.fieldContainer}>
                    <h2 className={classes.title}>{text.idTitle}</h2>
                    <h5 className={classes.subtitle}>{text.idSubtitle}</h5>
                    <Tip className={classes.tip} icon={faLock}>{text.idTip1}</Tip>
                    <Tip className={classes.tip}>{text.idTip2}</Tip>
                    <div className={classes.idsContainer}>
                        <div className={classes.idDropzoneContainer}>
                            <p className={classes.idDropzoneTitle}>
                                {text.front}
                            </p>
                            <p className={classes.idDropzoneSubtitle}>
                                {text.frontIdText}
                            </p>
                            {frontId ?
                                <>
                                    <HighlightOffIcon 
                                    className={classes.deleteIcon}
                                    onClick={() => setFrontId(null)} />
                                    <img
                                    className={classes.idPreview}
                                    src={frontId.preview}
                                    alt="Front of government ID" />
                                </> :
                                <Dropzone
                                className={classes.idDropzone}
                                iconComponent={AddCircleIcon}
                                iconClassName={classes.addIcon}
                                extraOptions={{
                                    onDrop: files => handleCreatePreview(setFrontId, files)
                                }}>
                                    <span className={classes.idDropzoneText}>
                                        {text.addFront}
                                    </span>
                                </Dropzone>}
                        </div>
                        <div className={classes.idDropzoneContainer}>
                            <p className={classes.idDropzoneTitle}>
                                {text.back}
                            </p>
                            <p className={classes.idDropzoneSubtitle}>
                                {text.backIdText}
                            </p>
                            {backId ?
                                <>
                                    <HighlightOffIcon 
                                    className={classes.deleteIcon}
                                    onClick={() => setBackId(null)} />
                                    <img
                                    className={classes.idPreview}
                                    src={backId.preview}
                                    alt="Back of government ID" />
                                </> :
                                <Dropzone
                                className={classes.idDropzone}
                                iconComponent={AddCircleIcon}
                                iconClassName={classes.addIcon}
                                extraOptions={{
                                    onDrop: files => handleCreatePreview(setBackId, files)
                                }}>
                                    <span className={classes.idDropzoneText}>
                                        {text.addBack}
                                    </span>
                                </Dropzone>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.footer}>
                <Button 
                type="submit" 
                variant="creator" 
                className={classes.doneButton}
                disabled={
                    (!data.me.photo && !profilePic) ||
                    (bio.length === 0) || 
                    (phoneNumber.length === 0) || 
                    !frontId || 
                    !backId
                }>
                    {text.done}
                </Button>
            </div>
        </form>
    );
}

export default CreatorForm;