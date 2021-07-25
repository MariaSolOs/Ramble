import React, { useState, useEffect } from 'react';

import {
    useGetCreatorFormFieldsQuery,
    useUpdateProfileMutation,
    useSignUpCreatorMutation
} from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';
import { useAppDispatch } from 'hooks/redux';
import { openErrorDialog } from 'store/uiSlice';
import { setProfile } from 'store/userSlice';

import InputAdornment from '@material-ui/core/InputAdornment';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import StripeMessage from './StripeMessage';
import Spinner from 'components/Spinner/Spinner';
import Dropzone from 'components/Dropzone';
import TextField from 'components/TextField/TextField';
import Tip from 'components/Tip/Tip';
import Button from 'components/GradientButton/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreatorForm.styles';
const useStyles = makeStyles(styles);

const VALID_PHONE_NUMBER_REG = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
const MAX_BIO_LENGTH = 500;

const CreatorForm = () => {
    const { CreatorForm: text } = useLanguageContext().appText;
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const [profilePic, setProfilePic] = useState<File>();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [bio, setBio] = useState('');
    const [frontId, setFrontId] = useState<File>();
    const [backId, setBackId] = useState<File>();
    const [uploading, setUploading] = useState(false);

    const { loading, data } = useGetCreatorFormFieldsQuery({
        onCompleted: ({ me }) => {
            if (me.phoneNumber) {
                setPhoneNumber(me.phoneNumber);
            }
        }
    })

    const [
        editUser,
        { loading: editUserLoading }
    ] = useUpdateProfileMutation({
        onCompleted: ({ editUser }) => {
            if (editUser) {
                /* Because creators have a different UI, we need
                   to update their profile on Redux */
                dispatch(setProfile(editUser));
            }
        },
        onError: () => {
            dispatch(openErrorDialog({ message: "We couldn't update your profile..." }));
        }
    });

    const [
        signUpCreator,
        { data: creatorData, loading: creatorLoading }
    ] = useSignUpCreatorMutation({
        onError: () => {
            dispatch(openErrorDialog({ message: "We couldn't create your creator profile..." }));
        }
    });

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
        const governmentIds: string[] = [];

        // Upload profile picture if the user didn't have one
        if (data && !data.me!.photo) {
            const photoData = new FormData();
            photoData.append('file', profilePic!);
            photoData.append('upload_preset', 'RAMBLE-users');

            const { secure_url } = await fetch(process.env.REACT_APP_CLOUDINARY_API_URI!, {
                method: 'POST',
                body: photoData
            }).then(res => res.json());
            photoUrl = secure_url;
        }

        // Upload IDs
        for (const id of [frontId, backId]) {
            const idData = new FormData();
            idData.append('file', id!);
            idData.append('upload_preset', 'RAMBLE-creators');
            const { secure_url } = await fetch(process.env.REACT_APP_CLOUDINARY_API_URI!, {
                method: 'POST',
                body: idData
            }).then(res => res.json());
            governmentIds.push(secure_url);
        }

        // Sign up creator
        signUpCreator({ variables: { bio, governmentIds }});

        // Update user information if needed
        const isNewPhoneNumber = data?.me.phoneNumber !== phoneNumber;
        if (profilePic || isNewPhoneNumber) {
            editUser({ 
                variables: {
                    ...profilePic && { photo: photoUrl },
                    ...isNewPhoneNumber && { 
                        phoneNumber: phoneNumber.replace(VALID_PHONE_NUMBER_REG, '($1) $2-$3') 
                    }
                }
            });
        }
    }

    // Stop the spinner when both mutations are completed
    useEffect(() => {
        if (!creatorLoading && !editUserLoading) {
            // Stop the spinner
            setUploading(false);
        }
    }, [creatorLoading, editUserLoading]);

    if (loading || !data) {
        return <Spinner />; 
    }

    // When the form was successfully submitted, start Stripe onboarding
    if (!creatorLoading && !editUserLoading && creatorData) {
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
                        <Dropzone
                        dropzoneClassName={classes.photoDropzone}
                        addButtonClassName={classes.addIcon}
                        deleteButtonClassName={classes.deleteIcon}
                        previewImageClassName={classes.photoPreview}
                        image={profilePic}
                        onFileDrop={setProfilePic} />
                    </>}
                <div className={classes.fieldContainer}>
                    <h2 className={classes.title}>{text.aboutYouTitle}</h2>
                    <h5 className={classes.subtitle}>{text.aboutYouSubtitle}</h5>
                    <Tip className={classes.tip}>{text.aboutYouTip}</Tip>
                    <TextField
                    multiline 
                    minRows={4}
                    maxRows={4}
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
                            <Dropzone
                            dropzoneClassName={classes.idDropzone}
                            addButtonClassName={classes.addIcon}
                            deleteButtonClassName={classes.deleteIcon}
                            previewImageClassName={classes.idPreview}
                            image={frontId}
                            onFileDrop={setFrontId}>
                                <span className={classes.idDropzoneText}>
                                    {text.addFront}
                                </span>
                            </Dropzone>
                        </div>
                        <div className={classes.idDropzoneContainer}>
                            <p className={classes.idDropzoneTitle}>
                                {text.back}
                            </p>
                            <p className={classes.idDropzoneSubtitle}>
                                {text.backIdText}
                            </p>
                            <Dropzone
                            dropzoneClassName={classes.idDropzone}
                            addButtonClassName={classes.addIcon}
                            deleteButtonClassName={classes.deleteIcon}
                            previewImageClassName={classes.idPreview}
                            image={backId}
                            onFileDrop={setBackId}>
                                <span className={classes.idDropzoneText}>
                                    {text.addBack}
                                </span>
                            </Dropzone>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={classes.footer}>
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
            </footer>
        </form>
    );
}

export default CreatorForm;