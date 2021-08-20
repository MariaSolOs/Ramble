import './dotenv.config';
import './mongoDB.config';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { verifyToken } from './utils/jwt';
import logger from './utils/logger';
import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client', 'build')));

const server = new ApolloServer({
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const adminId = verifyToken(token);
        logger(req, adminId);
        return adminId;
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
