import React from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

import type { SvgIconComponent } from '@material-ui/icons';

type DropzoneProps = {
    className: string;
    iconComponent: SvgIconComponent;
    iconClassName: string;
    extraOptions?: DropzoneOptions;
}

const BASE_OPTIONS: DropzoneOptions = {
    accept: 'image/jpg, image/jpeg, image/png',
    noClick: true,
    noKeyboard: true,
    maxFiles: 1
}

const Dropzone: React.FC<DropzoneProps> = (props) => {
    const { getRootProps, getInputProps, open } = useDropzone({
        ...BASE_OPTIONS,
        ...props.extraOptions
    }); 

    return (
        <div { ...getRootProps({ className: props.className }) }>
            <input { ...getInputProps() } />
            <props.iconComponent className={props.iconClassName} onClick={open} />
            { props.children }
        </div>
    );
}

export default Dropzone;