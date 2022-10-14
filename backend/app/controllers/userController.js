import userRegistrationUseCase from "../domain/usecases/userRegistration.js";
import userAccountConfirmation from "../domain/usecases/userAccountConfirmation.js";
import bcrypt from "bcrypt";
import userForgotPassword from "../domain/usecases/userForgotPassword.js";
import userChangePassword from "../domain/usecases/userChangePassword.js";
import userLogin from "../domain/usecases/userLogin.js";

const userRegistration = (req, res) => {

  const checkIfThereIsEmailAndPassword = (body) => {
    const { email, password } = body;

    if (!email || !password) {
      throw new Error("Invalid User");
    }
    return body;
  };

  const formatNewUser = (body) => {
    const { email, password } = body;

    const user = {
      email: email,
      password: password,
    };
    return user;
  };

  const resStatus201WithMessage = (response) => {
    res.status(201).json({ message: "The user has been created" });
    return response;
  };

  const resStatus400WithErrorMessage = (error) => {
    res.status(400).json(error.message);
    return error;
  };

  return Promise.resolve(req.body)
    .then(checkIfThereIsEmailAndPassword)
    .then(formatNewUser)
    .then(userRegistrationUseCase.Execute)
    .then(resStatus201WithMessage)
    .catch(resStatus400WithErrorMessage);
};

const userRegistrationConfirmation = async (req, res) => {

  const checkIfThereIsAnID = (body) => {
    if (!body.id) {
      throw new Error("Id is missing");
    }
    return body.id;
  };

  return Promise.resolve(req.body)
      .then(checkIfThereIsAnID)
      .then(userAccountConfirmation.Execute)
      .then(() => res.status(200).json({ message: "The user has been updated" }))
      .catch((error) => res.status(400).json(error.message));
};


const forgotPassword = async (req, res) => {

  const checkIfThereIsAnEmail = (body) => {
    if (!body.email) {
      throw new Error("Email is missing");
    }
    return body.email;
  };

  return Promise.resolve(req.body)
    .then(checkIfThereIsAnEmail)
    .then(userForgotPassword.Execute)
    .then(() => res.status(200).json({ message: "An email has been sent" }))
    .catch((error) => res.status(200).json({ message: "An email has been sent " }));
}

const resetPassword = async (req, res) => {

  const checkIfThereIsIdAndPassword = (body) => {
    if (!body.id || !body.password) {
      throw new Error("Id or password is missing");
    }
    return {
      id: body.id,
      password: body.password
    };
  };

  return Promise.resolve(req.body)
          .then(checkIfThereIsIdAndPassword)
          .then(userChangePassword.Execute)
          .then(() => res.status(200).json({ message: "Password updated" }))
          .catch((error) => res.status(400).json(error.message));  
}

const login = async (req, res) => {

  const checkIfThereIsEmailAndPassword = (body) => {
    const { email, password } = body;

    if (!email || !password) {
      throw new Error("Invalid User");
    }
    return body;
  };

  return Promise.resolve(req.body)
      .then(checkIfThereIsEmailAndPassword)
      .then(userLogin.Execute)
      .then((token) => res.status(200).json({token: token}))
      .catch(() => res.status(401).json({message: "Unauthorized access"}))

}

export default {
  userRegistration,
  userRegistrationConfirmation,
  forgotPassword,
  resetPassword,
  login
};
