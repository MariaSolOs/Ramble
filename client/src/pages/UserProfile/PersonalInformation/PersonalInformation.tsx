import React, { useState } from 'react';

import { useGetUserProfileQuery, useUpdateProfileMutation } from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from 'components/TextField/TextField';
import Spinner from 'components/Spinner/Spinner';
import Button from 'components/GradientButton/GradientButton';
import Layout from '../Layout';

import { makeStyles } from '@material-ui/core/styles';
import styles from './PersonalInformation.styles';
const useStyles = makeStyles(styles);

enum FormField {
    FirstName = 'firstName',
    LastName = 'lastName',
    City = 'city',
    Email = 'email',
    PhoneNumber = 'phoneNumber',
    Birthday = 'birthday',
    CreatorBio = 'creatorBio'
}

type Form = Record<FormField, string>;

const initialForm: Form = {
    firstName: '',
    lastName: '',
    city: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    creatorBio: ''
}

const VALID_PHONE_NUMBER_REG = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
const MAX_BIO_LENGTH = 500;

const PersonalInformation = () => {
    const { UserProfile_PersonalInformation: text } = useLanguageContext().appText;
    const classes = useStyles();

    // Form management
    const [values, setValues] = useState(initialForm);
    const [photo, setPhoto] = useState<File>();
    const [phoneError, setPhoneError] = useState(false);
    const [updatingProfile, setUpdatingProfile] = useState(false);

    // Fill the form with the existing data
    const { data, loading } = useGetUserProfileQuery({
        onCompleted: ({ me }) => {
            setValues({
                firstName: me.firstName,
                lastName: me.lastName,
                city: me.city || '',
                email: me.email,
                phoneNumber: me.phoneNumber || '',
                birthday: me.birthday || '',
                creatorBio: me.creator?.bio || ''
            });
        }
    });

    const [updateProfile] = useUpdateProfileMutation({
        refetchQueries: ['getUserProfile', 'getCoreProfile'],
        onCompleted: () => setUpdatingProfile(false)
    });

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        const newValue = event.target.value;

        // Make sure bio isn't too long
        if (fieldName === FormField.CreatorBio && newValue.length > MAX_BIO_LENGTH) {
            return;
        }

        setValues(values => ({ ...values, [fieldName]: newValue }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setUpdatingProfile(true);

        // Check if phone number is valid
        if (!VALID_PHONE_NUMBER_REG.test(values.phoneNumber)) {
            setPhoneError(true);
            setUpdatingProfile(false);
            return;
        }

        // If the user uploaded a new photo, upload to Cloudinary
        let photoUrl = '';
        if (photo) {
            const photoData = new FormData();
            photoData.append('file', photo);
            photoData.append('upload_preset', 'RAMBLE-users');

            const { secure_url } = await fetch(process.env.REACT_APP_CLOUDINARY_API_URI!, {
                method: 'POST',
                body: photoData
            }).then(res => res.json());
            photoUrl = secure_url;
        }

        const { creatorBio, ...userValues } = values;
        updateProfile({ 
            variables: { 
                ...userValues, 
                ...photoUrl && { photo: photoUrl  },
                ...isCreator && { creatorBio: values.creatorBio }
            }
        });
    }
    
    if (!data || loading) {
        return <Spinner />;
    }
    
    const isCreator = Boolean(data.me.creator?._id);

    return (
        <Layout
        name={data.me.firstName}
        onPhotoChange={setPhoto}
        photo={data.me.photo || undefined}
        city={data.me.city || undefined}>
            {updatingProfile && <Spinner />}
            <form className={classes.form} onSubmit={handleSubmit}>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label} htmlFor={FormField.FirstName}>
                        {text.firstName}
                    </FormLabel>
                    <TextField
                    id={FormField.FirstName}
                    name={FormField.FirstName}
                    required
                    value={values.firstName}
                    onChange={handleFormChange} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label} htmlFor={FormField.LastName}>
                        {text.lastName}
                    </FormLabel>
                    <TextField
                    id={FormField.LastName}
                    name={FormField.LastName}
                    required
                    value={values.lastName}
                    onChange={handleFormChange} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label} htmlFor={FormField.City}>
                        {text.liveIn}
                    </FormLabel>
                    <TextField
                    id={FormField.City}
                    name={FormField.City}
                    value={values.city}
                    onChange={handleFormChange} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label} htmlFor={FormField.Email}>
                        {text.email}
                    </FormLabel>
                    <TextField
                    id={FormField.Email}
                    name={FormField.Email}
                    required
                    type="email"
                    value={values.email}
                    onChange={handleFormChange} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label} htmlFor={FormField.PhoneNumber}>
                        {text.phoneNumber}
                    </FormLabel>
                    <TextField
                    id={FormField.PhoneNumber}
                    name={FormField.PhoneNumber}
                    required={isCreator}
                    type="tel"
                    placeholder="(123) 456-7890"
                    helperText={phoneError && text.phoneError}
                    value={values.phoneNumber}
                    onChange={handleFormChange} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label} htmlFor={FormField.Birthday}>
                        {text.birthday}
                    </FormLabel>
                    <TextField
                    id={FormField.Birthday}
                    name={FormField.Birthday}
                    type="date"
                    value={values.birthday}
                    onChange={handleFormChange} />
                </FormControl>
                {isCreator && 
                    <FormControl className={`${classes.formControl} ${classes.creatorBio}`}>
                        <FormLabel className={classes.label} htmlFor={FormField.CreatorBio}>
                            {text.aboutYou}
                        </FormLabel>
                        <TextField
                        id={FormField.CreatorBio}
                        name={FormField.CreatorBio}
                        multiline
                        minRows={4}
                        maxRows={4}
                        required
                        value={values.creatorBio}
                        onChange={handleFormChange}
                        inputprops={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {MAX_BIO_LENGTH - values.creatorBio.length}
                                </InputAdornment>
                            )
                        }} />
                    </FormControl>}
                <footer className={classes.footer}>
                    <Button 
                    variant="experience"
                    type="submit"
                    className={classes.submitButton}>
                        {text.submitButton}
                    </Button>
                </footer>
            </form>
        </Layout>
    );
}

export default PersonalInformation;