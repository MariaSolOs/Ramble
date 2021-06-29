const Users = require('./models/user');

const maintenance = async () => {
    // Users.collection.deleteMany({
    //     'membershipProvider': {$exists: true},
    //     'creator': {$exists: false}
    // });
}

module.exports = maintenance;

