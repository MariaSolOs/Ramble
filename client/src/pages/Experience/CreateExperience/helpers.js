// Using indexes identify the selected category
const categoryOptions = ['taste', 'create', 'relax', 'learn', 'move'];

export const initValues = () => ({
    location: null,
    zoomMeetingId: null,
    zoomMeetingPassword: null,
    meetPoint: null,
    coordinates: [],
    title: '',
    categories: [],
    description: '',
    setting: null,
    duration: 1, // in hours
    languages: [],
    capacity: null,
    ageRestricted: false, 
    ageRequired: 18,
    images: [null, null, null, null],
    included: [],
    toBring: [],
    price: 0, // per person 
    privatePrice: 0, // for private bookings
    currency: 'CAD',
    schedule: new Map(),
    startDate: null
});

/* Transform data to display in experience page and 
save in database */
export const prepareReview = (values, user) => {
    try {
        //If in-person experience, drop country code
        let locArray = [];
        if(values.location) {
            locArray = values.location.split(', ');
            locArray.pop(); 
        }
        
        let endMonth = new Date(values.startDate);
        endMonth.setMonth(endMonth.getMonth() + 1);
        
        const exp = {
            status: 'pending',

            //Add location if applicable
            ...(values.location && 
                { location: 
                    {
                        city: locArray[0],
                        region: locArray.length === 3 && locArray[1],
                        displayLocation: locArray.length === 3? 
                                         `${locArray[0]}, ${locArray[2]}` : 
                                         `${locArray[0]}, ${locArray[1]}`,
                        meetPoint: values.meetPoint,
                        coordinates: {
                            lat: values.coordinates[0],
                            long: values.coordinates[1]
                        }
                    }
                }
            ),

            //Add Zoom info if applicable
            ...(values.zoomMeetingId && 
                { zoomInfo: 
                    {
                        PMI: values.zoomMeetingId,
                        password: values.zoomMeetingPassword
                    }
                }
            ),

            title: values.title,

            categories: [categoryOptions[values.categories[0]], 
                        categoryOptions[values.categories[1]]]
                        .filter(opt => opt), // Remove undefined values

            description: values.description,

            ageRestriction: values.ageRestricted && values.ageRequired,

            setting: values.setting, 
            duration: values.duration,

            // Make all languages uppercase
            languages:  values.languages.map(lang => 
                            lang.charAt(0).toUpperCase() + lang.slice(1)
                        ),

            capacity: values.capacity,

            // Images will be uploaded to Cloudinary in server
            images: values.images.slice(0),

            included: (values.included).map(el => el.item),
            toBring: (values.toBring).map(el => el.item),

            price: {    
                perPerson: values.price,
                private: values.privatePrice > 0? values.privatePrice : null,
                currency: values.currency
            },

            avail: {
                from: values.startDate,
                to: endMonth,
                schedule: Array.from(values.schedule)
            },

            // This is the only field that changes after review
            creator: {
                user: {
                    name: user.name,
                    photo: user.photo
                },
                bio: user.bio
            }
        }
        
        return exp; 
    } catch(err) { return null; }
}

