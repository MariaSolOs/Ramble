"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceStatus = exports.ExperienceCategory = exports.Decision = void 0;
var Decision;
(function (Decision) {
    Decision["Approved"] = "approved";
    Decision["Rejected"] = "rejected";
})(Decision = exports.Decision || (exports.Decision = {}));
/** Ramble's experience categories. */
var ExperienceCategory;
(function (ExperienceCategory) {
    ExperienceCategory["Taste"] = "taste";
    ExperienceCategory["Create"] = "create";
    ExperienceCategory["Relax"] = "relax";
    ExperienceCategory["Learn"] = "learn";
    ExperienceCategory["Move"] = "move";
})(ExperienceCategory = exports.ExperienceCategory || (exports.ExperienceCategory = {}));
var ExperienceStatus;
(function (ExperienceStatus) {
    ExperienceStatus["Pending"] = "pending";
    ExperienceStatus["Approved"] = "approved";
    ExperienceStatus["Rejected"] = "rejected";
})(ExperienceStatus = exports.ExperienceStatus || (exports.ExperienceStatus = {}));
