const User = require('./models/user');
const Creator = require('./models/creator');

module.exports = async () => {
    console.log('Running maintenance script...');

    const toDel = [];
    const creators = await Creator.find({}, '_id user');

    for (const creator of creators) {
        const userCount = await User.count({ _id: creator.user });
        if (userCount == 0) {
            toDel.push(creator._id);
        }
    }

    await User.deleteMany({ _id: { $in: toDel }});

    console.log('Maintenance done!');
}