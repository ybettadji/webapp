import mailjetService from "../externalServices/emails/mailjet/mailjetService.js"
import { registrationConfirmationTemplate } from '../externalServices/emails/templates/registrationConfirmationTemplate.html.js'
import { resetPasswordTemplate } from "../externalServices/emails/templates/resetPasswordTemplate.html.js"
import tokenService from "./tokenService.js"

const sendRegistrationConfirmationEmail = (user) => { 
    const token = user.registrationConfirmationToken 
    console.log(token);

    const sender = {
        Email: process.env.MJ_SENDER_EMAIL,
        Name: process.env.MJ_SENDER_NAME
    }
    const recipient = [{
        Email: user.email,
        Name: ''
    }]    
    const confirmationUrl = process.env.FRONTEND_URL + '/register/confirmation/' + token;
    const subject = 'Confirmez votre adresse mail';
    const template = registrationConfirmationTemplate(confirmationUrl)
    const customID = 'Registration Confirmation'

    
    return mailjetService.sendEmail(sender, recipient, subject, template, customID, [], []);
}


const sendResetPasswordEmail = (user) => {
    const token = user.resetPasswordToken
    console.log(token);
    const sender = {
        Email: process.env.MJ_SENDER_EMAIL,
        Name: process.env.MJ_SENDER_NAME
    }
    const recipient = [{
        Email: user.email,
        Name: ''
    }]    
    const confirmationUrl = process.env.FRONTEND_URL + '/reset-password/' + token;
    const subject = 'Réinitialisez votre mot de passe';
    const template = resetPasswordTemplate(confirmationUrl)
    const customID = 'Reset Password'

    
    return mailjetService.sendEmail(sender, recipient, subject, template, customID, [], []);
}

export default {
    sendRegistrationConfirmationEmail,
    sendResetPasswordEmail
}
