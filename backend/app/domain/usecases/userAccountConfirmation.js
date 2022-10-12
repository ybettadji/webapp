import userService from "../../services/userService.js";
//import { User } from "../entities/user-entitie.js";

const Execute = async (id) => {
  const findUserInDB = async (id) => {
    const userFound = await userService.findUserById(id);
    if (!userFound) {
      throw new Error("The user does not exist");
    } else {
      return userFound;
    }
  };

  const checkIfTheUserIsAlreadyActivated = (user) => {
    if (user.status === "active") {
      throw new Error("The user is already activated");
    }
    return user;
  };

  const activateTheUser = (user) => {
    return userService.findOneByIdAndUpdate(user._id, { status: "active" });
  };

  return Promise.resolve(id)
                .then(findUserInDB)
                .then(checkIfTheUserIsAlreadyActivated)
                .then(activateTheUser)
                .catch((err) => {throw err;});
};

export default {
  Execute,
};
