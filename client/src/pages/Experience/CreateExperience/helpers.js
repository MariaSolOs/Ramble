//Using indexes identify the selected category
const categoryOptions = ['taste', 'create', 'relax',
                         'learn', 'move'];

//Helper function to ensure sorted timeslots                        
const slotSort = (slot1, slot2) => {
    const from1 = slot1.split('-')[0];
    const from2 = slot2.split('-')[0];

    const hour1 = +from1.slice(0, from1.length - 2).replace(':30', '.5');
    const hour2 = +from2.slice(0, from2.length - 2).replace(':30', '.5');
    const time1 = from1.slice(from1.length - 2, from1.length);
    const time2 = from2.slice(from2.length - 2, from2.length);

    if(time1 === 'AM' && time2 === 'PM') { return -1; }
    if(time2 === 'AM' && time1 === 'PM') {
        if(hour1 === 12) { return -1; }
        return 1;
    }
    if(hour1 < hour2) { return -1; }
    if(hour2 < hour1) { return 1; }
    return 0;
}
//For deepcloning map in availabilities
export const copyMap = (map) => {
    const copy = new Map();
    Array.from(map.keys()).forEach(key => {
        const content = map.get(key).slice(0);
        content.sort(slotSort);
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
    try {
        const locArray = values.location.split(', ');
        locArray.pop(); //Drop the country code
        let endWeek = new Date(values.startDate);
        let end2Weeks = new Date(values.startDate);
        let endMonth = new Date(values.startDate);
        endWeek.setDate(endWeek.getDate() + 7);
        end2Weeks.setDate(end2Weeks.getDate() + 14);
        endMonth.setMonth(endMonth.getMonth() + 1);
        
        const exp = {
            status: 'pending',
            location: {
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
                private: values.privatePrice > 0? values.privatePrice : null,
                currency: values.currency
            },

            avail: {
                from: values.startDate,
                to: values.scheduleUpdateFreq === 'weekly'? 
                    endWeek : values.scheduleUpdateFreq === 'biweekly'?
                    end2Weeks : endWeek,
                schedule: Array.from(values.schedule)
            },

            //This is the only field that changes after review
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

