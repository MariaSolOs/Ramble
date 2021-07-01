import { useCallback } from 'react';

import { useSaveExperienceMutation, useUnsaveExperienceMutation } from 'graphql-api';
import { useAppDispatch } from 'hooks/redux';
import { saveExperience, unsaveExperience } from 'store/userSlice';

/**
 * @returns Function that saves/unsaves an experience from the user's 
 * list of saved experiences.
 */
export default function useHeartClick() {
    const dispatch = useAppDispatch();

    const [saveExp] = useSaveExperienceMutation({
        onCompleted: ({ saveExperience: data }) => {
            dispatch(saveExperience({
                experienceId: data._id
            }));
        }
    });

    const [unsaveExp] = useUnsaveExperienceMutation({
        onCompleted: ({ unsaveExperience: data }) => {
            dispatch(unsaveExperience({
                experienceId: data._id
            }));
        }
    });
    
    const handleHeartClick = useCallback((isSaved: boolean, experienceId: string) => {
        if (isSaved) {
            unsaveExp({ variables: { experienceId }});
        } else {
            saveExp({ variables: { experienceId }});
        }
    }, [unsaveExp, saveExp]);

    return handleHeartClick;
}