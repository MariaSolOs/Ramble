import '../dotenv.config';
import fs from 'fs';
import path from 'path';
import mjml2html from 'mjml';
import { compile } from 'handlebars';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
// TODO: Translate emails

/**
 * Sends an email for resetting the user's password.
 * 
 * @param userId - The ID of the unlucky user
 * @param emailAddress - The address to send the email to
 */
export const sendPasswordResetEmail = async (
    userId: string, 
    emailAddress: string
) => {
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

/**
 * Sends an email to a creator when a booking is made.
 * 
 * @param clientName - The client's name
 * @param experienceName - The name of the experience that was booked
 * @param dashboardLink - The link that the creator will be redirected to
 * @param creatorEmail - The address to send the email to
 */
export const sendBookingNotificationEmail = async (
    clientName: string, 
    experienceName: string,
    dashboardLink: string,
    creatorEmail: string
) => {
    const source = fs.readFileSync(path.resolve(__dirname, '../email-templates/new-booking.mjml'), 'utf-8');
    const template = compile(source);
    const mjml = template({
        clientName,
        experienceName,
        dashboardLink
    });
    
    await sgMail.send({
        from: {
            email: process.env.ZOHO_EMAIL!,
            name: 'ramble' 
        },
        to: creatorEmail,
        subject: 'You have a new booking request',
        text: `You have a new booking! ${clientName} just booked your experience ${
        experienceName}. Log in to your creator dashboard to check their booking request.`,
        html: mjml2html(mjml).html
    });
}