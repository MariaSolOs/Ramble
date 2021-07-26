import { useCallback } from 'react';

import { 
    useSaveExperienceMutation, 
    useUnsaveExperienceMutation
} from 'graphql-api';
import { saveExperience, unsaveExperience } from 'store/user-cache';

/**
 * @returns Hook that saves/unsaves an experience from the user's 
 * list of saved experiences.
 */
export default function useHeartClick() {
    const [saveExp] = useSaveExperienceMutation({
        onCompleted: ({ saveExperience: data }) => {
            saveExperience(data._id);
        }
    });

    const [unsaveExp] = useUnsaveExperienceMutation({
        onCompleted: ({ unsaveExperience: data }) => {
            unsaveExperience(data._id);
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