import tokenService from "../../services/tokenService.js"
import emailService from "../../services/emailService.js";
import userService from "../../services/userService.js";

const Execute = async (email) => {
    const checkIfEmailExist = async (email) => {
        const userFound = await userService.findOneUserByProperty({email: email});
        if (!userFound) {
            throw new Error("the user does not exist2");
        } else {
            return userFound;
        }
    };

    const createResetPasswordToken = (user) =>{
        user.resetPasswordToken = tokenService.createResetPasswordToken(user)
        return user
    } 


    const sendResetPasswordEmail = (user) => {
        emailService.sendResetPasswordEmail(user);
        return user;
    }; 

    return Promise.resolve(email)
            .then(checkIfEmailExist)
            .then(createResetPasswordToken)
            .then(sendResetPasswordEmail)
            .catch((err) => {throw err;});


}

export default {
    Execute
}