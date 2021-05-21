require('dotenv').config({ path: './.env' });

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { Experiences } = require('./graphql/datasources');
const path = require('path');
const mongoClient = require('./config/mongoDB');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        experienceAPI: new Experiences(mongoClient.db().collection('experiences'))
    })
});

server.applyMiddleware({ app });

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Apollo server ready at ${server.graphqlPath}`);
});
