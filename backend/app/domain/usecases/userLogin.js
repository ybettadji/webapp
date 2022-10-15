import tokenService from "../../services/tokenService.js"
import emailService from "../../services/emailService.js";
import userService from "../../services/userService.js";
import { UserEmailWithPasswordEntity } from "../entities/UserEntity.js";

const Execute = async (userEmailAndPassword) => {

    const passwordsToCompare = {
        plaintextPassword: '',
        cryptedPassword: ''
    }
    const createUserEmailWithPasswordEntity = (userEmailAndPassword) => {
        const {password, email} = new UserEmailWithPasswordEntity(userEmailAndPassword)
        passwordsToCompare.plaintextPassword = password
        return email
    }

    const RetrieveTheUserLinkedToTheEmail = async (email) => {
        const userFound = await userService.findOneUserByProperty({email: email});
        if (!userFound) {
            throw new Error("The user does not exist");
        } else {
            passwordsToCompare.cryptedPassword = userFound.password
            return userFound;
        }
    };

    const checkTheUserStatus = (user) => {
        if(user.status !== 'active'){
            throw new Error('Inactive user')
        }
        return user
    }

    const comparePasswords = async (user) => {
        const {plaintextPassword, cryptedPassword} = passwordsToCompare
        const comparedPassword = await userService.comparePasswords(plaintextPassword, cryptedPassword)
        if (!comparedPassword) {
            throw new Error('Incorrect password')
        }
        return user
    }

    const createSessionToken = (user) =>{
        return tokenService.createSessionToken(user)
    } 



    return Promise.resolve(userEmailAndPassword)
            .then(createUserEmailWithPasswordEntity)
            .then(RetrieveTheUserLinkedToTheEmail)
            .then(checkTheUserStatus)
            .then(comparePasswords)
            .then(createSessionToken)
            .catch((err) => {throw err;});


}

export default {
    Execute
}