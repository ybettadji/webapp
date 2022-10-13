import userService from "../../services/userService.js";
import emailService from "../../services/emailService.js";
import {UserWithoutIdEntity} from '../entities/UserEntity.js'
import tokenService from "../../services/tokenService.js";

const createUserWithoutIdEntity = (userEmailWithPassword) => {
  return new UserWithoutIdEntity({
    ...userEmailWithPassword,
    status: "inactive",
    role: "member",
  })
};

const checkIfEmailIsAvailableInDB = async (userWithoutIdEntity) => {
  const userFound = await userService.findOneUserByProperty({email: userWithoutIdEntity.email});
  if (userFound) {
    throw new Error("The user already exists");
  } else {
    return userWithoutIdEntity;
  }
};

const encryptPassword = async (userWithoutIdEntity) => {
  const {password} = userWithoutIdEntity
  const cryptedPassword = await userService.paswordEncrypter(password)

  return {
    ...userWithoutIdEntity,
    password: cryptedPassword,
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
                .then(createUserWithoutIdEntity)
                .then(checkIfEmailIsAvailableInDB)
                .then(encryptPassword)
                .then(createUserInDB)
                .then(createRegistrationConfirmationToken)
                .then(sendRegistrationConfirmationEmail)
                .catch((err) => {throw err;});
};

export default {
  Execute
};
