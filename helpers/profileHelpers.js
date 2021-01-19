const fs = require('fs'),
      path = require('path'),
      {compile} = require('handlebars'),
      mjml2html = require('mjml'),
      sgMail = require('../config/sendgrid');

const User = require('../models/user');

exports.generatePromoCode = async (fstName) => {
    try {
        let codeName;
        if(fstName.length === 0) { codeName = 'RAMBLE'; } 
        else { codeName = fstName.toUpperCase(); }

        const codesWithSamePrefix = await User.find({
                                        'promoCode.code': new RegExp(`^${codeName}`)
                                    }).distinct('promoCode.code');

        let codeNum = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
        let code = codeName + codeNum;
        while(codesWithSamePrefix.includes(code)) {
            codeNum = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
            code = codeName + codeNum;
        }
        return code;
    } catch(err) {
        return Math.floor(Math.random() * 9999999).toString().padStart(7, '0');
    }
}

exports.verifyUserEmail = async (email, userId) => {
    //Create mjml
    const source = fs.readFileSync(path.resolve(__dirname, 
                   '../emailTemplates/emailAddressVerification.mjml'), 'utf-8');              
    const template = compile(source);
    const mjml = template({
        verifyLink: `${process.env.CLIENT_URL}/api/email/verify-email-address/${
        userId}`
    });

    //Send email
    await sgMail.send({
        from: {
            name: 'ramble',
            email: process.env.ZOHO_EMAIL
        }, 
        to: email,
        subject: 'Verify your email address', 
        text: 'To start experiencing, we want to make sure we ' +
        'have the right email address.', 
        html: mjml2html(mjml, {
            filePath: path.resolve(__dirname, 
            '../emailTemplates/emailAddressVerification.mjml')
        }).html
    });
}