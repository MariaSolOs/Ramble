import React from 'react';
import {Cloudinary} from 'cloudinary-core';

export const CloudinaryContext = React.createContext();

export default (props) => {
    const cloudinary = new Cloudinary({
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUDNAME
    });

    return (
       <CloudinaryContext.Provider value={cloudinary}>
            {props.children}
        </CloudinaryContext.Provider>
    );
}

