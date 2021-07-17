const Experience = require('./models/experience');
const User = require('./models/user');

const maintenance = async () => {
    const users = await User.find({}, 'bookedExperiences');

    for (const user of users) {
        const exps = [];
        for (const exp of user.bookedExperiences) {
            if (Experience.exists(exp)) {
                exps.push(exp);
            }
        }
        user.bookedExperiences = exps;
        await user.save();
    }
    console.log('DONE');
}

module.exports = maintenance;

