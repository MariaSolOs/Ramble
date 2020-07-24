import React, {useState} from 'react';
import Files from 'react-butterfiles';
import uuid from 'react-uuid';

//Components
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tip from '../../../../../components/Tip';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './PreviewStyles';
const useStyles = makeStyles(styles);

const captions = [
    { title: 'Cover Picture',
      details: 'This picture will appear on the front page of your experience' },
    { title: 'Creator',
      details: 'Share a picture of you conducting your experience' },
    { title: 'Action Shot',
      details: 'Show your guests having a great time' },
    { title: 'Location',
      details: 'Include a shot of the surroundings' }
];

const Preview = ({images, submitInput}) => {
    const classes = useStyles();

    //Image dropzone
    const [index, setIndex] = useState(0);
    const handleErrors = (errors) => {
        //TODO: Do something smart here
        console.log(errors);
    }
    const handleAddImage = (files) => {
        const newImg = files[0].src.base64;
        const newImages = [...images.slice(0, index), newImg, ...images.slice(index + 1)];
        submitInput('images', newImages);
    }
    const handleDeleteImage = (index) => {
        const newImages = [...images.slice(0, index), null, ...images.slice(index + 1)];
        submitInput('images', newImages);
    }

    return (
        <><div>
            <h1 className={classes.title}>Preview</h1>
            <p className={classes.description}>
                Provide your guests with a teaser of what they'll do.<br/>
            </p>
            <Tip>
                Use high quality pictures so that your experience sticks out. Try to include
                people in the pictures.
            </Tip>
        </div>
        <div>
            <Files
            multiple
            convertToBase64
            accept={['image/jpg', 'image/jpeg', 'image/png']}
            onError={handleErrors}
            onSuccess={handleAddImage}>
                {({ browseFiles, getDropZoneProps }) => (
                    <div
                    {...getDropZoneProps({ className: classes.dropzone })}>
                        {images.map((image, i) => (
                            <div className={classes.dropzoneItem} key={uuid()}>
                                <div className={classes.itemsDetails}>
                                    <p>{captions[i].title}</p>
                                    <p>{captions[i].details}</p>
                                </div>
                                <div className={classes.dropzoneImg}>
                                    {image && <HighlightOffIcon 
                                               className={classes.deleteIcon}
                                               onClick={() => handleDeleteImage(i)}/>}
                                    {image ? <img src={image} alt="Experience preview"/> :
                                    <AddCircleIcon 
                                    className={classes.addIcon} 
                                    onClick={browseFiles}
                                    onMouseEnter={() => setIndex(i)}/>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Files>
        </div></>
    );
}

export default Preview;