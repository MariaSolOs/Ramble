import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import fs from 'fs';
import path from 'path';
import mjml2html from 'mjml';
import { compile } from 'handlebars';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
// TODO: Translate emails

export const sendPasswordResetEmail = async (userId: string, emailAddress: string) => {
    const source = fs.readFileSync(path.resolve(__dirname, '../email-templates/password-reset.mjml'), 'utf-8');              
    const template = compile(source);
    const mjml = template({
        passwordLink: `${process.env.CLIENT_URL}/email/password-reset/${userId}`
    });

    await sgMail.send({
        from: {
            email: process.env.ZOHO_EMAIL!, 
            name: 'ramble'
        },
        to: emailAddress,
        subject: 'Reset your password', 
        text: "Forgot your password? It's okay, you can create a new one.", 
        html: mjml2html(mjml).html
    });
}