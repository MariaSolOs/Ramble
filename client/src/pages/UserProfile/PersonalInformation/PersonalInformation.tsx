import React, { useState } from 'react';

import { useGetUserProfileQuery } from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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

const PersonalInformation = () => {
    const { UserProfile_PersonalInformation: text } = useLanguageContext().appText;
    const classes = useStyles();

    // Form management
    const [values, setValues] = useState(initialForm);
    const [photo, setPhoto] = useState<File>();

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        const newValue = event.target.value;

        setValues(values => ({
            ...values,
            [fieldName]: newValue
        }));
    }

    const handleSubmit = () => {
        // If the user uploaded a new photo, upload to Cloudinary
        if (photo) {

        }
    }

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

    
    if (!data || loading) {
        return <Spinner />;
    }
    
    const isCreator = Boolean(data.me.creator);

    return (
        <Layout
        name={data.me.firstName}
        onPhotoChange={setPhoto}
        photo={data.me.photo || undefined}
        city={data.me.city || undefined}>
            <form className={classes.form}>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label} htmlFor={FormField.FirstName}>
                        {text.name}
                    </FormLabel>
                    <TextField
                    id={FormField.FirstName}
                    name={FormField.FirstName}
                    required
                    value={values.firstName}
                    onChange={handleFormChange} />
                </FormControl>
                <FormControl className={classes.formControl}>
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
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.label} htmlFor={FormField.CreatorBio}>
                            {text.aboutYou}
                        </FormLabel>
                        <TextField
                        id={FormField.CreatorBio}
                        name={FormField.CreatorBio}
                        multiline
                        rows={4}
                        maxRows={4}
                        required
                        value={values.creatorBio}
                        onChange={handleFormChange} />
                    </FormControl>}
            </form>
            <footer className={classes.footer}>
                <Button 
                variant="experience"
                onClick={handleSubmit}
                className={classes.submitButton}>
                    {text.submitButton}
                </Button>
            </footer>
        </Layout>
    );
}

export default PersonalInformation;