const User = require('./models/user');

module.exports = async () => {
    console.log('Running maintenance script...');

    const users = await User.find({});
    for (const user of users) {
        user.lastLogin = new Date();
        await user.save();
    }

    console.log('Maintenance done!');
}