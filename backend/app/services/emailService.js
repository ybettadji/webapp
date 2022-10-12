import mailjetService from "../externalServices/emails/mailjet/mailjetService.js"
import { registrationConfirmationTemplate } from '../externalServices/emails/templates/registrationConfirmationTemplate.html.js'
import tokenService from "./tokenService.js"

const sendRegistrationConfirmationEmail = (user) => { 

    const token = tokenService.createRegistrationToken(user) 
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

export default {
    sendRegistrationConfirmationEmail
}
