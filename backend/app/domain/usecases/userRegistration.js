//import { User, UserEmailWithPassword, UserWithoutId } from "../entities/user-entitie.js";
import userService from "../../services/userService.js";
import emailService from "../../services/emailService.js";
import {UserWithoutIdEntity} from '../entities/UserEntity.js'
import tokenService from "../../services/tokenService.js";

const formatNewUser = (userEmailWithPassword) => {
  return new UserWithoutIdEntity({
    ...userEmailWithPassword,
    status: "inactive",
    role: "member",
  })
};

const checkIfEmailIsAvailableInDB = async (newUser) => {
  const userFound = await userService.findOneUserByProperty({email: newUser.email});
  if (userFound) {
    throw new Error("The user already exists");
  } else {
    return newUser;
  }
};

const createUserInDB = (user) => {
  return userService.createUserInDB(user);
};

const createRegistrationConfirmationToken = (user) => {
  user.registrationConfirmationToken = tokenService.createRegistrationConfirmationToken(user)
  return user
}

const sendRegistrationConfirmationEmail = (userCreated) => {
  emailService.sendRegistrationConfirmationEmail(userCreated);
  return userCreated;
};

const Execute = async (userEmailWithPassword) => {
  return Promise.resolve(userEmailWithPassword)
                .then(formatNewUser)
                .then(checkIfEmailIsAvailableInDB)
                .then(createUserInDB)
                .then(createRegistrationConfirmationToken)
                .then(sendRegistrationConfirmationEmail)
                .catch((err) => {throw err;});
};

export default {
  formatNewUser,
  checkIfEmailIsAvailableInDB,
  createUserInDB,
  createRegistrationConfirmationToken,
  sendRegistrationConfirmationEmail,
  Execute,
};
