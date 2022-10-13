import userRegistrationUseCase from "../domain/usecases/userRegistration.js";
import userAccountConfirmation from "../domain/usecases/userAccountConfirmation.js";
import bcrypt from "bcrypt";
import userForgotPassword from "../domain/usecases/userForgotPassword.js";
import userChangePassword from "../domain/usecases/userChangePassword.js";

const userRegistration = (req, res) => {

  const checkIfThereIsEmailAndPassword = (body) => {
    const { email, password } = body;

    if (!email || !password) {
      throw new Error("Invalid User");
    }
    return body;
  };

  const checkIfEmailFormatIsValid = (body) => {
    const { email } = body;
    const emailIsValid = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailIsValid) {
      throw new Error("Invalid Email");
    }
    return body;
  };

  const checkIfPasswordFormatIsValid = (body) => {
    const { password } = body;
    const passwordIsValid = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d`!@#$%^&*()_+\-=\[\]{};':"\\]{8,}$/);
    if (!passwordIsValid) {
      throw new Error("Invalid Password");
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

  const encryptPassword = async (user) => {
    const cryptedPassword = await bcrypt.hash(user.password, 10);

    const userUpdated = {
      ...user,
      password: cryptedPassword,
    };
    return userUpdated;
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
    .then(checkIfEmailFormatIsValid)
    .then(checkIfPasswordFormatIsValid)
    .then(formatNewUser)
    .then(encryptPassword)
    .then(userRegistrationUseCase.Execute)
    .then(resStatus201WithMessage)
    .catch(resStatus400WithErrorMessage);
};

const userRegistrationConfirmation = async (req, res) => {
  const { id } = req.body;

  return userAccountConfirmation.Execute(id)
        .then(() => res.status(200).json({ message: "The user has been updated" }))
        .catch((error) => res.status(400).json(error.message));
};

const forgotPassword = async (req, res) => {
  const {email} = req.body
  return userForgotPassword.Execute(email)
        .then(() => res.status(200).json({ message: "An email has been sent" }))
        .catch((error) => res.status(200).json({ message: "An email has been sent" }));

}

const resetPassword = async (req, res) => {
  const {id, password } = req.body
  
  const checkIfPasswordFormatIsValid = (password) => {
    const passwordIsValid = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d`!@#$%^&*()_+\-=\[\]{};':"\\]{8,}$/);
    if (!passwordIsValid) {
      throw new Error("Invalid Password");
    }
    return password;
  };

  const encryptPassword = async (password) => {
    const cryptedPassword = await bcrypt.hash(password, 10);
    return cryptedPassword
  }

  return Promise.resolve(password)
          .then(checkIfPasswordFormatIsValid)
          .then(encryptPassword)
          .then((cryptedPassword) => userChangePassword.Execute(id, cryptedPassword))
          .then(() => res.status(200).json({ message: "Password updated" }))
          .catch((error) => res.status(400).json(error.message));  
}

export default {
  userRegistration,
  userRegistrationConfirmation,
  forgotPassword,
  resetPassword
};
