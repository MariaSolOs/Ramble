const nodemailer = require('nodemailer');

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const emailErrorToMariaHandler = (err, req) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, 
        auth: {
            user: process.env.ZOHO_EMAIL, 
            pass: process.env.ZOHO_PASSWORD
        }
    });

    transporter.sendMail({
        from: {
            name: 'ramble',
            address: process.env.ZOHO_EMAIL
        }, 
        to: process.env.ZOHO_EMAIL,
        subject: 'ERROR', 
        text: `TIME: ${new Date().toISOString()} \n USER ID: ${req.userId}\n 
        ERROR NAME: ${err.name}\n ERROR MESSAGE: ${err.message}\n ERROR STACK: ${
        err.stack}`, 
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