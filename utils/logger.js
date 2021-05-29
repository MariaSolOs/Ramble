module.exports = (req, context) => {
    console.log(`[ ${new Date().toISOString()} ]`, 
    `[ ${req.body.operationName.toUpperCase()} ]`, 
    '[ VARIABLES:', req.body.variables, ']',
    `[ USER: ${context ? context.userId : 'UNKNOWN'} ]`);
}