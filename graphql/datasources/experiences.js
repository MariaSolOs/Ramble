const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class Experiences extends MongoDataSource {
    experienceReducer(exp) {
        return {
            
        }
    }

    async getAllExperiences() {
        const exps = await this.collection.find({}).toArray();
        return exps.map(this.experienceReducer);
    }
}