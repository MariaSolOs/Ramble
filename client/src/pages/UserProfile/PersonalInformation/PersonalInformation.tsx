import React, { useState } from 'react';

import { useGetUserProfileQuery } from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from 'components/TextField/TextField';
import Spinner from 'components/Spinner/Spinner';
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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

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

    return (
        <Layout
        name={data.me.firstName}
        onPhotoChange={setPhoto}
        photo={data.me.photo || undefined}
        city={data.me.city || undefined}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <FormControl className={classes.formControl}>
                    <FormLabel 
                    className={classes.label} 
                    htmlFor={FormField.FirstName}>
                        {text.name}
                    </FormLabel>
                    <TextField
                    id={FormField.FirstName}
                    name={FormField.FirstName}
                    value={values.firstName}
                    onChange={handleFormChange} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                    id={FormField.LastName}
                    name={FormField.LastName}
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
            </form>
        </Layout>
    );
}

export default PersonalInformation;