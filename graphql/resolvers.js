module.exports = {
    Query: {
        experiences: (_, __, { dataSources }) => {
            return dataSources.experienceAPI.getAllExperiences()
        }
    }
}