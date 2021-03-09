import uuid from 'react-uuid';

export const initValues = (exp) => ({
    description: exp.description,
    setting: exp.setting,
    duration: exp.duration,
    languages: exp.languages.slice(0),
    capacity: exp.capacity,
    ageRestricted: exp.ageRestriction !== 0, 
    ageRequired: exp.ageRestriction,
    images: exp.images.slice(0),
    included: exp.included.map(item => ({
        key: uuid(), item
    })),
    toBring: exp.toBring.map(item => ({
        key: uuid(), item
    })),
    price: exp.price.perPerson,
    privatePrice: exp.price.private !== null? 
                        exp.price.private : 0,
    currency: exp.price.currency,
    isZoomExp: Boolean(exp.zoomInfo)
});

/* Transform data to display in experience page and 
save changes in database */
export const prepareReview = (currentExp, editedExp, user) => {
    try {
        const exp = {
            // Fixed fields (can only be set in creation)
            location: { ...currentExp.location },
            title: currentExp.title,
            categories: currentExp.categories.slice(0),
            avail: { ...currentExp.avail },

            description: editedExp.description,
            ageRestriction: editedExp.ageRestricted && editedExp.ageRequired,
            setting: editedExp.setting, 
            duration: editedExp.duration,

            // Make all languages uppercase
            languages:  editedExp.languages.map(lang => 
                            lang.charAt(0).toUpperCase() + lang.slice(1)
                        ),

            capacity: editedExp.capacity,
            images: editedExp.images.slice(0),

            included: (editedExp.included).map(el => el.item),
            toBring: (editedExp.toBring).map(el => el.item),

            price: {    
                perPerson: editedExp.price,
                private: editedExp.privatePrice > 0? 
                         editedExp.privatePrice : null,
                currency: editedExp.currency
            },

            creator: {
                user: {
                    name: user.name,
                    photo: user.photo
                },
                bio: user.bio
            }
        }
        
        return exp; 
    } catch (err) { return null; }
}

