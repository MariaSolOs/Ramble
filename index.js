require('dotenv').config({ path: './.env' });
require('./mongoDB');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const path = require('path');
const logger = require('./utils/logger');
const { verifyToken } = require('./utils/jwt');
const express = require('express');
const cors = require('cors');
const restRoutes = require('./restAPI');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use('/', restRoutes);

const server = new ApolloServer({
    context: ({ req }) => {
        const token = req.headers && (req.headers.authorization || '');
        const user = verifyToken(token);
        logger(req, user);
        return user; 
    },
    typeDefs,
    resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Apollo server ready at ${server.graphqlPath}`);
});
