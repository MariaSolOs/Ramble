const Experience = require('./models/experience'),
      Occurrence = require('./models/occurrence'),
      Booking = require('./models/booking'),
      Creator = require('./models/creator'),
      User = require('./models/user');

const experienceData = [
    {title: 'Amazing food city tour',
    price: {
        perPerson: 40,
        private: 50
    },
    categories: ['taste'],
    location: {
        city: 'Montreal',
        region: 'Quebec',
    }},
    {title: 'Vintage diners tour',
    price: {
        perPerson: 25
    },
    categories: ['taste'],
    location: {
        city: 'Montreal',
        region: 'Quebec',
    }},
    {title: 'Create your own drink',
    price: {
        perPerson: 25
    },
    categories: ['taste'],
    location: {
        city: 'Montreal',
        region: 'Quebec',
    }},
    {title: 'Learn, eat, cook',
    price: {
        perPerson: 40,
        private: 50,
    },
    categories: ['taste'],
    location: {
        city: 'Montreal',
        region: 'Quebec',
    }}, 
            
    {title: "90's movies marathon",
    price: {
        perPerson: 30
    },
    categories: ['relax'],
    location: {
        city: 'Toronto',
        region: 'Ontario',
    }},
    {title: "Neon midnight",
    price: {
        perPerson: 50
    },
    categories: ['relax'],
    location: {
        city: 'Toronto',
        region: 'Ontario',
    }},
    {title: "A story about film",
    price: {
        perPerson: 30
    },
    categories: ['relax'],
    location: {
        city: 'Toronto',
        region: 'Ontario',
    }},
    
    {title: "Parks and cakes",
    price: {
        perPerson: 30
    },
    categories: ['learn'],
    location: {
        city: 'St-Lambert',
        region: 'Quebec',
    }},
    {title: "Make your own puzzle",
    price: {
        perPerson: 15
    },
    categories: ['learn'],
    location: {
        city: 'St-Lambert',
        region: 'Quebec',
    }},
    {title: "Playful city tour",
    price: {
        perPerson: 35
    },
    categories: ['learn'],
    location: {
        city: 'St-Lambert',
        region: 'Quebec',
    }},
    {title: "Storytime afternoon",
    price: {
        perPerson: 20
    },
    categories: ['learn'],
    location: {
        city: 'St-Lambert',
        region: 'Quebec',
    }},
    
    {title: "Morning jog",
    price: {
        perPerson: 15
    },
    categories: ['create'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    {title: "Cheese, wine, and trees",
    price: {
        perPerson: 25
    },
    categories: ['create'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    {title: "Firecamp adventure",
    price: {
        perPerson: 45
    },
    categories: ['create'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    {title: "Explore the mountains",
    price: {
        perPerson: 30
    },
    categories: ['create'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    
    {title: "Scouts challenge",
    price: {
        perPerson: 20
    },
    categories: ['create'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    {title: "An evening with beers",
    price: {
        perPerson: 20
    },
    categories: ['create'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    
    {title: "A tour behind curtains",
    price: {
        perPerson: 40
    },
    categories: ['culture', 'move'],
    location: {
        city: 'Boston',
        region: 'Massachusetts',
    }},
    {title: "Architecture exhibition",
    price: {
        perPerson: 20
    },
    categories: ['culture'],
    location: {
        city: 'Boston',
        region: 'Massachusetts',
    }},
    {title: "Meet the classics",
    price: {
        perPerson: 40
    },
    categories: ['culture'],
    location: {
        city: 'Boston',
        region: 'Massachusetts',
    }}
];

const images = [`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,dpr_auto,h_400,q_auto/v1/Ramble/Experiences/demo_1.jpeg`,
                `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,dpr_auto,h_400,q_auto/v1/Ramble/Experiences/demo_2.jpeg`,
                `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,dpr_auto,h_400,q_auto/v1/Ramble/Experiences/demo_3.jpeg`,
                `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,dpr_auto,h_400,q_auto/v1/Ramble/Experiences/demo_4.jpeg`,
                `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,dpr_auto,h_400,q_auto/v1/Ramble/Experiences/demo_5.jpeg`,
                `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,dpr_auto,h_400,q_auto/v1/Ramble/Experiences/demo_6.jpeg`];

const expStatus = ['pending', 'approved', 'refused'];

const seedDB = async () => {
    //Clear database
    // try {
    //     await Booking.collection.drop();
    //     await Occurrence.collection.drop();
    //     await Experience.collection.drop();
    // } catch(err) {
    //     console.log("Couldn't clear database.");
    //     return;
    // }
    // console.log('Database cleared.');

    // const creator = new Creator({
    //     name: 'Maria',
    //     photo: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10214469674769845&height=200&width=200&ext=1598365748&hash=AeQ3WCqIwWvVW92a',
    //     bio: `Occupy nisi ex disrupt scenester mixtape 90's. Quinoa asymmetrical 
    //     ad humblebrag tousled enim cloud bread consequat williamsburg bushwick 
    //     eu magna cray vaporware subway tile.`,
    //     stripe: {
    //         id: 'acct_1GpJf0JtP9MgNrPQ'
    //     }
    // });
    // await creator.save();
    //const creator = await Creator.findById('5f21b3176a6c734261291a0a');

    // [...experienceData, ...experienceData]
    // .forEach(async seed => {
    //     const exp = new Experience(seed);
    //     exp.status = expStatus[Math.round(Math.random())]
    //     exp.location.displayLocation = `${exp.location.city}, ${exp.location.region}`;
    //     const randImgIndex = Math.floor(Math.random() * 6);
    //     exp.images.push(images[randImgIndex]);
    //     exp.images.push(images[(randImgIndex + 1) % 6]);
    //     exp.images.push(images[(randImgIndex + 2) % 6]);
    //     exp.location.meetPoint = 'McGill University';
    //     exp.setting = 'semi-private';
    //     exp.duration = 2;
    //     exp.ageRestriction = 15;
    //     exp.avail = {};
    //     exp.avail.from = new Date('Wednesday August 19 2020');
    //     exp.avail.to = new Date('Wednesday September 30 2020');
    //     exp.avail.schedule = {Tuesday: ['8AM-10AM'],
    //                           Thursday: ['8AM-10AM', '2:30PM-4:30PM', '4:30PM-6:30PM'],
    //                           Friday: ['8AM-10AM', '2:30PM-4:30PM', '8PM-10PM', '10PM-12AM'],
    //                           Saturday: ['8AM-10AM', '2:30PM-4:30PM', '8PM-10PM']};
    //     exp.price.currency = 'CAD';
    //     exp.languages = ['English', 'Español'];
    //     exp.capacity = Math.floor(Math.random() * 7) + 1;
    //     exp.description = "Poutine chartreuse cray, pickled hoodie enamel pin quinoa fixie chicharrones vinyl. Scenester humblebrag hammock polaroid, poutine authentic church-key single-origin coffee paleo tofu iceland mixtape XOXO before they sold out hell of. Succulents 3 wolf moon keffiyeh tousled. Succulents chartreuse waistcoat, normcore cliche YOLO retro.",
    //     exp.included = ['drinks', 'equipment', 'transport'];
        // exp.bring = ['stickers', 'spoons'];
        // exp.rating = {
        //     value: 4.91,
        //     numRatings: 11
        // }
    //     //I create everything
    //     exp.creator = creator._id;
    //     await exp.save();
    // });
    //console.log('Database populated.');
}

module.exports = seedDB;