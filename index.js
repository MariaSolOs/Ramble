require('dotenv').config({ path: './.env' });

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const mongoClient = require('./config/mongoDB');
const { Experiences } = require('./graphql/datasources');
const express = require('express');
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        experienceAPI: new Experiences(mongoClient.db().collection('experiences'))
    })
});

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Apollo server ready at ${server.graphqlPath}`);
});
