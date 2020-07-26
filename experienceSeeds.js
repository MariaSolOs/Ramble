const Experience = require('./models/experience'),
      Occurrence = require('./models/occurrence'),
      Booking = require('./models/booking'),
      Creator = require('./models/creator');

const experienceData = [
    {title: 'Amazing food city tour',
    price: {
        perPerson: 40,
        private: 50
    },
    categories: ['tastebuds'],
    location: {
        city: 'Montreal',
        region: 'Quebec',
    }},
    {title: 'Vintage diners tour',
    price: {
        perPerson: 25
    },
    categories: ['tastebuds'],
    location: {
        city: 'Montreal',
        region: 'Quebec',
    }},
    {title: 'Create your own drink',
    price: {
        perPerson: 25
    },
    categories: ['tastebuds'],
    location: {
        city: 'Montreal',
        region: 'Quebec',
    }},
    {title: 'Learn, eat, cook',
    price: {
        perPerson: 40,
        private: 50,
    },
    categories: ['tastebuds'],
    location: {
        city: 'Montreal',
        region: 'Quebec',
    }}, 
            
    {title: "90's movies marathon",
    price: {
        perPerson: 30
    },
    categories: ['entertainment'],
    location: {
        city: 'Toronto',
        region: 'Ontario',
    }},
    {title: "Neon midnight",
    price: {
        perPerson: 50
    },
    categories: ['entertainment'],
    location: {
        city: 'Toronto',
        region: 'Ontario',
    }},
    {title: "A story about film",
    price: {
        perPerson: 30
    },
    categories: ['entertainment'],
    location: {
        city: 'Toronto',
        region: 'Ontario',
    }},
    
    {title: "Parks and cakes",
    price: {
        perPerson: 30
    },
    categories: ['family'],
    location: {
        city: 'St-Lambert',
        region: 'Quebec',
    }},
    {title: "Make your own puzzle",
    price: {
        perPerson: 15
    },
    categories: ['family'],
    location: {
        city: 'St-Lambert',
        region: 'Quebec',
    }},
    {title: "Playful city tour",
    price: {
        perPerson: 35
    },
    categories: ['family'],
    location: {
        city: 'St-Lambert',
        region: 'Quebec',
    }},
    {title: "Storytime afternoon",
    price: {
        perPerson: 20
    },
    categories: ['family'],
    location: {
        city: 'St-Lambert',
        region: 'Quebec',
    }},
    
    {title: "Morning jog",
    price: {
        perPerson: 15
    },
    categories: ['outdoors'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    {title: "Cheese, wine, and trees",
    price: {
        perPerson: 25
    },
    categories: ['outdoors'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    {title: "Firecamp adventure",
    price: {
        perPerson: 45
    },
    categories: ['outdoors'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    {title: "Explore the mountains",
    price: {
        perPerson: 30
    },
    categories: ['outdoors'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    
    {title: "Scouts challenge",
    price: {
        perPerson: 20
    },
    categories: ['gatherings', 'outdoors'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    {title: "An evening with beers",
    price: {
        perPerson: 20
    },
    categories: ['gatherings', 'outdoors'],
    location: {
        city: 'Long Island',
        region: 'New York',
    }},
    
    {title: "A tour behind curtains",
    price: {
        perPerson: 40
    },
    categories: ['culture', 'gatherings'],
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
const images = ['Ramble/Experiences/demo_1.jpeg',
                'Ramble/Experiences/demo_2.jpeg',
                'Ramble/Experiences/demo_3.jpeg',
                'Ramble/Experiences/demo_4.jpeg',
                'Ramble/Experiences/demo_5.jpeg',
                'Ramble/Experiences/demo_6.jpeg'];

const seedDB = async () => {
    //Clear database
    try {
        await Booking.collection.drop();
        await Occurrence.collection.drop();
        await Experience.collection.drop();
    } catch(err) {
        console.log("Couldn't clear database.");
        return;
    }
    console.log('Database cleared.');

    [...experienceData, ...experienceData, ...experienceData]
    .forEach(async seed => {
        const exp = new Experience(seed);
        exp.location.displayLocation = `${exp.location.city}, ${exp.location.region}`;
        const randImgIndex = Math.floor(Math.random() * 6);
        exp.images.push(images[randImgIndex]);
        exp.images.push(images[(randImgIndex + 1) % 6]);
        exp.images.push(images[(randImgIndex + 2) % 6]);
        exp.location.meetPoint = 'McGill University';
        exp.setting = 'semi-private';
        exp.duration = 2;
        exp.ageRestriction = 15;
        exp.avail = {};
        exp.avail.from = new Date('July July 27 2020');
        exp.avail.to = new Date('Sunday August 30 2020');
        exp.avail.schedule = {Tuesday: ['8AM-10AM'],
                              Thursday: ['8AM-10AM', '2:30PM-4:30PM', '4:30PM-6:30PM'],
                              Friday: ['8AM-10AM', '2:30PM-4:30PM', '8PM-10PM', '10PM-12AM'],
                              Saturday: ['8AM-10AM', '2:30PM-4:30PM', '8PM-10PM']};
        exp.price.currency = 'CAD';
        exp.languages = ['English', 'Español'];
        exp.capacity = Math.floor(Math.random() * 7) + 1;
        exp.description = "Poutine chartreuse cray, pickled hoodie enamel pin quinoa fixie chicharrones vinyl. Scenester humblebrag hammock polaroid, poutine authentic church-key single-origin coffee paleo tofu iceland mixtape XOXO before they sold out hell of. Succulents 3 wolf moon keffiyeh tousled. Succulents chartreuse waistcoat, normcore cliche YOLO retro.",
        exp.included = ['drinks', 'equipment', 'transport'];
        exp.bring = ['stickers', 'spoons'];
        exp.rating = 4.91;
        //I create everything
        exp.creator = '5f1d95d704411f0750ae454b';
        await exp.save();

        //Create some random occurrences
        const numPeople = Math.floor(Math.random() * 5) + 1;
        if(exp.capacity < numPeople){ return; }
        const occ = new Occurrence({
            experience: exp._id,
            date: new Date('Friday August 28 2020'),
            timeslot: '8PM-10PM',
            spotsLeft: exp.capacity
        });
        const book = new Booking({ occurrence: occ._id, numPeople });
        await book.save();
        occ.spotsLeft -= book.numPeople;
        occ.bookings.push(book);
        await occ.save();
    });
    console.log('Database populated.');
}

module.exports = seedDB;