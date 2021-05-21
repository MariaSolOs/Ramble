const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class Experiences extends MongoDataSource {
    experienceReducer(exp) {
        return {
            _id: exp._id,
            status: exp.status.toUpperCase(),
            title: exp.title,
            description: exp.description,
            images: exp.images,
            location: exp.location.displayLocation,
            meetingPoint: exp.location.meetPoint,
            ...exp.location.coordinates && {
                latitude: exp.location.coordinates.lat,
                longitude: exp.location.coordinates.long,
            },
            categories: exp.categories.map(categ => categ.toUpperCase()),
            ageRestriction: exp.ageRestriction,
            duration: exp.duration,
            languages: exp.languages,
            includedItems: exp.included,
            toBringItems: exp.toBring,
            capacity: exp.capacity,
            ...exp.zoomInfo && {
                zoomPMI: exp.zoomInfo.PMI,
                zoomPassword: exp.zoomInfo.password
            },
            pricePerPerson: exp.price.perPerson,
            pricePrivate: exp.price.private,
            currency: exp.price.currency,
            ratingValue: exp.rating.value,
            numberOfRatings: exp.rating.numRatings,
            creator: exp.creator,
            availableFromDate: exp.avail.from,
            availableToDate: exp.avail.to,
            availabilitySchedule: Object.entries(exp.avail.schedule).map(([day, slots]) => ({
                day, slots
            }))
        }
    }

    async getAllExperiences() {
        const exps = await this.collection.find({}).toArray();
        return exps.map(this.experienceReducer);
    }
}