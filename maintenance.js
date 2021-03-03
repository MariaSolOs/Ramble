const User = require('./models/user');

module.exports = () => {
    console.log('Running maintenance script...');

    User.updateMany({}, { $rename: { pastExperiences: 'bookedExperiences' } }, { multi: true }, 
        (err, blocks) => {
        if (err) { throw err; }
        console.log('User succesfully updated.');
    });
}