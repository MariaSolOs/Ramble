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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const data_reducers_1 = require("../utils/data-reducers");
const jwt_1 = require("../utils/jwt");
const server_types_1 = require("../server-types");
const mongodb_models_1 = require("../mongodb-models");
exports.resolvers = {
    Experience: {
        creator: ({ creator }) => mongodb_models_1.Creator.findById(creator).lean(server_types_1.LEAN_DEFAULTS).then(data_reducers_1.creatorReducer)
    },
    User: {
        creator: ({ creator }) => mongodb_models_1.Creator.findById(creator).lean(server_types_1.LEAN_DEFAULTS).then(data_reducers_1.creatorReducer)
    },
    Creator: {
        user: ({ user }) => mongodb_models_1.User.findById(user).lean(server_types_1.LEAN_DEFAULTS).then(data_reducers_1.userReducer)
    },
    Query: {
        unapprovedExperiences: () => __awaiter(void 0, void 0, void 0, function* () {
            const exps = yield mongodb_models_1.Experience.find({ status: 'approved' });
            return exps.map(data_reducers_1.experienceReducer);
        }),
        experience: (_, { id }) => mongodb_models_1.Experience.findById(id).lean(server_types_1.LEAN_DEFAULTS).then(data_reducers_1.experienceReducer)
    },
    Mutation: {
        logIn: (_, { userName, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const loggedInAdmin = yield mongodb_models_1.Admin.findOne({ userName }).lean(server_types_1.LEAN_DEFAULTS);
            if (!loggedInAdmin) {
                throw new apollo_server_express_1.AuthenticationError('Admin account not found');
            }
            if (!mongodb_models_1.Admin.isValidPassword(password, loggedInAdmin.passwordHash)) {
                throw new apollo_server_express_1.AuthenticationError('Invalid credentials');
            }
            const admin = data_reducers_1.adminReducer(loggedInAdmin);
            admin.token = jwt_1.generateToken(admin._id.toString());
            return admin;
        })
    }
};
