import userService from "../../services/userService.js";
import {UserPasswordEntity} from '../entities/UserEntity.js'

const Execute = async (idAndPassword) => {

    const {id, password} = idAndPassword

    const createUserPasswordEntity = (password) => {
        return new UserPasswordEntity({
            password: password
        })
    }

    const encryptPassword = async (userPasswordEntity) => {
        return await userService.paswordEncrypter(userPasswordEntity.password)
      }

    const changePasswordInDB = async (id, encryptedPassword) => {
        return await userService.findOneByIdAndUpdate(id, { password: encryptedPassword });
    };

  return Promise.resolve(password)
        .then(createUserPasswordEntity)
        .then(encryptPassword)
        .then((cryptedPassword) => changePasswordInDB(id, cryptedPassword))
        .catch((err) => {throw err;});
};

export default {
  Execute,
};
