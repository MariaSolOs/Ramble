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
const cloudinary_1 = require("../utils/cloudinary");
const server_types_1 = require("../server-types");
const mongodb_models_1 = require("../mongodb-models");
const resolvers_types_1 = require("./resolvers-types");
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
    Review: {
        experience: ({ experience }) => mongodb_models_1.Experience.findById(experience).lean(server_types_1.LEAN_DEFAULTS).then(data_reducers_1.experienceReducer),
        writtenBy: ({ writtenBy }) => mongodb_models_1.User.findById(writtenBy).lean(server_types_1.LEAN_DEFAULTS).then(data_reducers_1.userReducer)
    },
    Query: {
        experiencesByStatus: (_, { status }) => __awaiter(void 0, void 0, void 0, function* () {
            const exps = yield mongodb_models_1.Experience.find({ status: { $in: status } }).lean(server_types_1.LEAN_DEFAULTS);
            return exps.map(data_reducers_1.experienceReducer);
        }),
        experience: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const exp = yield mongodb_models_1.Experience.findById(id).lean(server_types_1.LEAN_DEFAULTS);
            return data_reducers_1.experienceReducer(exp);
        }),
        unapprovedReviews: () => __awaiter(void 0, void 0, void 0, function* () {
            const reviews = yield mongodb_models_1.Review.find({ approved: false }).lean(server_types_1.LEAN_DEFAULTS);
            return reviews.map(data_reducers_1.reviewReducer);
        })
    },
    Mutation: {
        logIn: (_, { userName, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const loggedInAdmin = yield mongodb_models_1.Admin.findOne({ userName }).lean(server_types_1.LEAN_DEFAULTS);
            if (!loggedInAdmin) {
                throw new apollo_server_express_1.AuthenticationError('Admin account not found.');
            }
            if (!mongodb_models_1.Admin.isValidPassword(password, loggedInAdmin.passwordHash)) {
                throw new apollo_server_express_1.AuthenticationError('Invalid credentials.');
            }
            const admin = data_reducers_1.adminReducer(loggedInAdmin);
            admin.token = jwt_1.generateToken(admin._id.toString());
            return admin;
        }),
        approveExperience: (_, { id, decision }) => __awaiter(void 0, void 0, void 0, function* () {
            // Find experience
            const experience = yield mongodb_models_1.Experience.findByIdAndUpdate(id, {
                status: decision
            });
            return data_reducers_1.experienceReducer(experience);
        }),
        deleteExperience: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            // Only delete if there are no occurrences
            const occurrencesExist = yield mongodb_models_1.Occurrence.exists({ experience: id });
            if (occurrencesExist) {
                throw new apollo_server_express_1.ApolloError('Experience still has existing occurrences.');
            }
            // Delete experience
            const exp = yield mongodb_models_1.Experience.findByIdAndDelete(id);
            if (!exp) {
                throw new apollo_server_express_1.ApolloError('Experience not found');
            }
            // Delete images
            cloudinary_1.deleteExperiencePictures(exp.images);
            // Delete reviews
            yield mongodb_models_1.Review.deleteMany({ experience: exp._id });
            // Remove from users' saved and booked experiences
            yield mongodb_models_1.User.updateMany({ savedExperiences: exp._id }, { $pull: { savedExperiences: exp._id } });
            yield mongodb_models_1.User.updateMany({ bookedExperiences: exp._id }, { $pull: { bookedExperiences: exp._id } });
            return data_reducers_1.experienceReducer(exp);
        }),
        approveReview: (_, { id, decision }) => __awaiter(void 0, void 0, void 0, function* () {
            const review = yield mongodb_models_1.Review.findByIdAndUpdate(id, {
                approved: decision === resolvers_types_1.Decision.Approved
            });
            return data_reducers_1.reviewReducer(review);
        })
    }
};
