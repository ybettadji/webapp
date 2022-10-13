import userService from "../../services/userService.js";

const Execute = async (id, encryptedPassword) => {

    const changePasswordInDB = async (id, encryptedPassword) => {
    const user2 = await userService.findOneByIdAndUpdate(id, { password: encryptedPassword });
};

  return Promise.resolve(id)
                .then((id) => changePasswordInDB(id, encryptedPassword))
                .catch((err) => {throw err;});
};

export default {
  Execute,
};
