const Experience = require('./models/experience');

const maintenance = async () => {
    // const exps = await Experience.find({}, 'location');
    // exps.forEach(async exp => {
        // exp.set('location.region', undefined);
        // await exp.save()
    // });
    // for (const exp of exps) {
    //     console.log(exp)
    // }
    // Experience.collection.update({'location.city': {$exists: true}}, {$unset: {'location.city': 1}}, {multi:true});
}

module.exports = maintenance;

