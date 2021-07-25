import React from 'react';
import { NavLink } from 'react-router-dom';

import { useLanguageContext } from 'context/languageContext';

import Avatar from '@material-ui/core/Avatar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Dropzone from 'components/Dropzone';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Layout.styles';
const useStyles = makeStyles(styles);

type Props = {
    name: string;
    onPhotoChange?: (photo?: File) => void;
    photo?: string;
    city?: string;
}

const Layout: React.FC<Props> = (props) => {
    const { UserProfile_Layout: text } = useLanguageContext().appText;
    const classes = useStyles();
    
    const isPhotoEditable = Boolean(props.onPhotoChange);

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                {isPhotoEditable ?
                    <Dropzone
                    image={props.photo}
                    addButton={AddAPhotoIcon}
                    addButtonClassName={classes.addPhotoIcon}
                    deleteButtonClassName={classes.deletePhotoIcon}
                    dropzoneClassName={`${classes.photo} ${classes.photoDropzone}`}
                    previewImageClassName={`${classes.photo} ${classes.photoPreview}`}
                    onFileDrop={props.onPhotoChange!} /> :
                    <Avatar src={props.photo} className={classes.photo}>
                        {props.name.charAt(0)}
                    </Avatar>}
                <div>
                    <h3 className={classes.name}>{props.name}</h3>
                    <p className={classes.city}>{props.city}</p>
                </div>
            </header>
            <nav className={classes.nav}>
                <NavLink to="/profile/personal-information" className={classes.navLink}>
                    {text.personalInformation}
                </NavLink>
                <NavLink to="/profile/experiences" className={classes.navLink}>
                    {text.experiences}
                </NavLink>
            </nav>
            {props.children}
        </div>
    );
}

export default Layout;