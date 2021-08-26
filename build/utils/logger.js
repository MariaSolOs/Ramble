"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, alias) => {
    var _a;
    console.log(`[ ${new Date().toISOString()} ]`, `[ ${(_a = req.body.operationName) === null || _a === void 0 ? void 0 : _a.toUpperCase()} ]`, '[ VARIABLES:', req.body.variables, ']', `[ ADMIN: ${alias || 'UNKNOWN'} ]`);
};
exports.default = logger;
