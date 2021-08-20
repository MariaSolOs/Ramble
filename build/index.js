"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./dotenv.config");
require("./mongoDB.config");
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
const jwt_1 = require("./utils/jwt");
const logger_1 = __importDefault(require("./utils/logger"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(cors_1.default({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../client', 'build')));
const server = new apollo_server_express_1.ApolloServer({
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const adminId = jwt_1.verifyToken(token);
        logger_1.default(req, adminId);
        return adminId;
    },
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    server.applyMiddleware({ app, path: '/graphql' });
}))();
app.get('*', (_, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client', 'build', 'index.html'));
});
app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Apollo server ready at ${server.graphqlPath}`);
});
