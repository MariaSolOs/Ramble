import type { Request } from 'express';
import type { Context } from '../server-types';

const logger = (req: Request, context: Context | null) => {
    console.log(`[ ${new Date().toISOString()} ]`, 
    `[ ${req.body.operationName?.toUpperCase()} ]`, 
    '[ VARIABLES:', req.body.variables, ']',
    `[ ADMIN: ${context ? context.adminId : 'UNKNOWN'} ]`);
}

export default logger;