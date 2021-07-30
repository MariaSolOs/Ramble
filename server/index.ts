import './dotenv.config';
import './mongodb.config';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { verifyToken } from './utils/jwt';
import logger from './utils/logger';
import express from 'express';
import cors from 'cors';
import path from 'path';
import emailRoutes from './emailsAPI';
import stripeRoutes from './stripeAPI';

// Make sure bin scripts run in Heroku

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/stripe/webhook')) {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client', 'build')));
app.use('/email', emailRoutes);
app.use('/stripe', stripeRoutes);

const server = new ApolloServer({
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = verifyToken(token);
        logger(req, user);
        return user;
    },
    typeDefs,
    resolvers
});

(async () => {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
})();

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Apollo server ready at ${server.graphqlPath}`);
});
