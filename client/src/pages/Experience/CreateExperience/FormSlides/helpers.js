//Using indexes identify the selected category
const categoryOptions = ['culture', 'gatherings', 'tastebuds',
                         'entertainment', 'family', 'outdoors'];

//For deepcloning map in availabilities
export const copyMap = (map) => {
    const copy = new Map();
    Array.from(map.keys()).forEach(key => {
        const content = map.get(key).slice(0);
        copy.set(key, content);
    });
    return copy;
}

//For having dynamic timeslots
export const getTimeSlots = (duration) => {
    const slots = [];
    for(let start = 8; (start + duration) <= 24; start += duration) {
        const end = (start + duration);
        const slot = { 
            from: { 
                hour: `${((start + 11) % 12 + 1)}`.replace('.5', ':30'),
                time: start >= 12 && start !== 24? 'PM' : 'AM'
            },
            to: { 
                hour: `${((end + 11) % 12 + 1)}`.replace('.5', ':30'),
                time: end >= 12 && end !== 24? 'PM' : 'AM'
            }
        }
        slots.push(slot);
    }
    return slots;
}

/*Transform data to display in experience page and 
save in database*/
export const prepareReview = (values, user) => {
    console.log(values);

    try {
        const locArray = values.location.split(', ');
        const exp = {
            status: 'pending',
            location: {
                city: locArray[0],
                region: locArray.length === 3 && locArray[1],
                displayLocation: values.location,
                meetPoint: values.meetPoint
            },

            title: values.title,

            categories: [categoryOptions[values.categories[0]], 
                        categoryOptions[values.categories[1]]]
                        .filter(opt => opt), //Remove undefined values

            description: values.description,

            ageRestriction: values.ageRestricted && values.ageRequired,

            setting: values.setting, 
            duration: values.duration,

            //Make all languages uppercase
            languages:  values.languages.map(lang => 
                            lang.charAt(0).toUpperCase() + lang.slice(1)
                        ),

            capacity: values.capacity,

            //Images will be uploaded to Cloudinary in server
            images: values.images.slice(0),

            included: (values.included).map(el => el.item),
            toBring: (values.toBring).map(el => el.item),

            price: {    
                perPerson: values.price,
                private: values.privatePrice,
                currency: values.currency
            },

            avail: {
                from: values.timeframe[0],
                to: values.timeframe[1],
                schedule: values.schedule
            },

            //This is the only field that changes after review
            creator: {
                user: {
                    name: user.fstName,
                    photo: user.photo,
                    bio: values.creatorBio
                }
            }
        }
        console.log(exp)
        return exp; 
    } catch(err) {
        console.log(err);
        return null;
    }
}

