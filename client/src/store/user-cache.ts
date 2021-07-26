import { makeVar } from '@apollo/client';

import type { CoreProfileFragment as ProfilePayload } from 'graphql-api';

interface UserProfile {
    userId: string;
    creatorId: string;
    firstName: string;
    email: string;
    photo: string;
}

const initialProfile: UserProfile = {
    userId: '',
    creatorId: '',
    firstName: '',
    email: '',
    photo: ''
}

export const userProfileVar = makeVar<UserProfile>(initialProfile);

export const savedExperiencesVar = makeVar<string[]>([]);

export const setUserInfo = (profile: ProfilePayload) => {
    userProfileVar({
        userId: profile._id,
        creatorId: profile.creator?._id || '',
        firstName: profile.firstName,
        email: profile.email,
        photo: profile.photo || ''
    });
    savedExperiencesVar(profile.savedExperiences.map(({ _id }) => _id ));
}

export const logout = () => {
    userProfileVar(initialProfile);
}

export const saveExperience = (toAdd: string) => {
    const savedExperiences = savedExperiencesVar();
    savedExperiencesVar([ ...savedExperiences, toAdd ]);
}

export const unsaveExperience = (toDelete: string) => {
    const updatedExperiences = savedExperiencesVar().filter(id => 
        id !== toDelete
    );
    savedExperiencesVar(updatedExperiences);
}


