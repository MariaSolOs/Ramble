require('dotenv').config({ path: '../.env' });

const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');
const { compile } = require('handlebars');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendPasswordResetEmail = async (userId, emailAddress) => {
    const source = fs.readFileSync(path.resolve(__dirname, '../emailTemplates/passwordReset.mjml'), 'utf-8');              
    const template = compile(source);
    const mjml = template({
        passwordLink: `${process.env.CLIENT_URL}/email/password-reset/${userId}`
    });

    await sgMail.send({
        from: {
            email: process.env.ZOHO_EMAIL, 
            name: 'ramble'
        },
        to: emailAddress,
        subject: 'Reset your password', 
        text: "Forgot your password? It's okay, you can create a new one.", 
        html: mjml2html(mjml).html
    });
}