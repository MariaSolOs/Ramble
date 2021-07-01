module.exports = {
    schema: './graphql/intro-schema.json',
    documents: ['./client/src/graphql-api/*.graphql'],
    extensions: {
        endpoints: {
            default: {
                url: 'http://localhost:4000/graphql',
            }
        }
    }
}