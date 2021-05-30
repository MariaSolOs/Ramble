const User = require('./models/user');
const Experience = require('./models/experience');

const maintenance = async () => {
    const users = await User.find({ }, 'bookedExperiences');

    for (const user of users) {
        const savedExps = [];
        for (const exp of user.bookedExperiences) {
            const exists = await Experience.exists({ _id: exp._id });

            if (exists) {
                savedExps.push(exp._id);
            }
        }
        user.savedExperiences = savedExps;

        await user.save();
    }
}

module.exports = maintenance;

