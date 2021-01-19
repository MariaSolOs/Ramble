const sgMail = require('../config/sendgrid');

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const emailErrorToMariaHandler = (err, req) => {
    sgMail.send({
        from: {
            name: 'ramble',
            email: process.env.ZOHO_EMAIL
        }, 
        to: process.env.ZOHO_EMAIL,
        subject: 'ERROR', 
        text: `TIME: ${new Date().toISOString()} \n USER ID: ${req.userId}\n 
        ERROR NAME: ${err.name}\n ERROR MESSAGE: ${err.message}\n ERROR STACK: ${
        err.stack}`
    });
}

const handleError = (err, req, res) => {
    let {statusCode, message} = err;
    statusCode = statusCode? statusCode : 500;

    if((statusCode !== 404) && 
       (process.env.NODE_ENV === 'production')) {
        emailErrorToMariaHandler(err, req);
    }
    
    res.status(statusCode).send({
        status: 'error',
        statusCode,
        message
    });
}

module.exports = { ErrorHandler, handleError }