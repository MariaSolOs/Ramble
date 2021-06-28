import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

import { isFile, isPreviewableFile } from 'models/file';
import type { PreviewableFile } from 'models/file';
import type { SvgIconComponent } from '@material-ui/icons';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';

type Props = {
    image?: File | string;
    onFileDrop: (file?: File) => void;
    addButton?: SvgIconComponent;
    deleteButton?: SvgIconComponent;
    dropzoneClassName: string;
    addButtonClassName?: string; 
    deleteButtonClassName?: string; 
    previewImageClassName: string;
}

const BASE_OPTIONS: DropzoneOptions = {
    accept: 'image/jpg, image/jpeg, image/png',
    noClick: true,
    noKeyboard: true,
    maxFiles: 1
}

const Dropzone: React.FC<Props> = (props) => {
    const [image, setImage] = useState<PreviewableFile | string>(null);

    const handleAddFile = useCallback((files: File[]) => {
        const dropped = files[0];
        // Create URL for the image preview
        setImage({
            file: dropped,
            preview: URL.createObjectURL(dropped)
        });
        // Report file to parent
        props.onFileDrop(dropped);

        // We can assume that the file drop callback never changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteFile = useCallback(() => {
        // Revoke preview URL if we had a file
        if (isPreviewableFile(image)) {
            URL.revokeObjectURL(image!.preview);
        }
        setImage(null);
        // Report to parent
        props.onFileDrop();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    // Keep previewable file updated 
    useEffect(() => {
        if (props.image) {
            if (isFile(props.image)) {
                setImage({
                    file: props.image,
                    preview: URL.createObjectURL(props.image)
                });
            } else {
                setImage(props.image);
            }
        }
    }, [props.image]);

    // Make sure to avoid memory leaks
    useEffect(() => {
        return () => {
            if (image && isPreviewableFile(image)) {
                URL.revokeObjectURL(image.preview);
            }
        }
    }, [image]);
    
    const { getRootProps, getInputProps, open } = useDropzone({
        ...BASE_OPTIONS,
        onDrop: handleAddFile
    }); 

    // If there's a file, show the preview, else display the dropzone
    if (image) {
        return (
            <div className={props.dropzoneClassName}>
                <img 
                alt="Dropzone" 
                src={isPreviewableFile(image) ? image.preview : image} 
                className={props.previewImageClassName} />
                {props.deleteButton && 
                    <props.deleteButton 
                    className={props.deleteButtonClassName} 
                    onClick={handleDeleteFile} />}
            </div>
        );
    } else {
        return (
            <div { ...getRootProps({ className: props.dropzoneClassName }) }>
                <input { ...getInputProps() } />
                {props.addButton && 
                    <props.addButton className={props.addButtonClassName} onClick={open} />}
                {props.children}
            </div>
        );
    }
}

Dropzone.defaultProps = {
    onFileDrop: () => {},
    addButton: AddCircleIcon,
    deleteButton: HighlightOffIcon,
    dropzoneClassName: '',
    previewImageClassName: ''
}

export default Dropzone;