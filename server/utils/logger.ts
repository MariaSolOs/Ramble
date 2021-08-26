import type { Request } from 'express';

const logger = (req: Request, alias: string) => {
    console.log(`[ ${new Date().toISOString()} ]`, 
    `[ ${req.body.operationName?.toUpperCase()} ]`, 
    '[ VARIABLES:', req.body.variables, ']',
    `[ ADMIN: ${alias || 'UNKNOWN'} ]`);
}

export default logger;