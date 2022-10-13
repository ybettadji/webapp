export class UserEntity {
  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.password = user.password;
    this.status = user.status;
    this.role = user.role;
    this.validate(user)
  }
  
  validate(user) {
    checkIfPropertiesArePresent(user, "_id", "email", "password", "status", "role")
    checkIfPropertiesAreEmpty(this._id, this.email, this.password, this.status, this.role)
    checkIfEmailFormatIsValid(this.email)
    checkIfPasswordFormatIsValid(this.password)

  }
}

export class UserWithoutIdEntity {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
    this.status = user.status;
    this.role = user.role;
    this.validate(user)
  }

  
  validate(user) {
    checkIfPropertiesArePresent(user, "email", "password", "status", "role")
    checkIfPropertiesAreEmpty(this.email, this.password, this.status, this.role)
    checkIfEmailFormatIsValid(this.email)
    checkIfPasswordFormatIsValid(this.password)

  }
   
}

export class UserEmailWithPasswordEntity {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
    this.validate(user)
  }

  validate(user) {
    checkIfPropertiesArePresent(user, "email", "password")
    checkIfPropertiesAreEmpty(this.email, this.password)
    checkIfEmailFormatIsValid(this.email)
    checkIfPasswordFormatIsValid(this.password)
  }
}

export class UserPasswordEntity {
  constructor(user) {
    this.password = user.password;
    this.validate(user)
  }

  validate(user) {
    checkIfPropertiesArePresent(user, "password")
    checkIfPropertiesAreEmpty(this.password)
    checkIfPasswordFormatIsValid(this.password)
  }
}


//------------------------------------------------------------

const checkIfEmailFormatIsValid = (email) => {
  const emailIsValid = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (!emailIsValid) {
    throw new Error("Invalid Email");
  }
}

/** au moins 8 caracteres, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractere special */
const checkIfPasswordFormatIsValid = (password) => {
  const passwordIsValid = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\\]{8,}$/);
  if (!passwordIsValid) {
    throw new Error("Invalid Password");
  }
};

const checkIfPropertiesArePresent = (user, ...propertiesToCheck) => {
  propertiesToCheck.forEach(property => {
    if (property in user){
      return true
    } else {
      throw new Error('Proprety ' +property+ ' is missing in the User')
    }
  });
}

const checkIfPropertiesAreEmpty = (...propertiesToCheck) => {
  propertiesToCheck.forEach(property => {
    if (!property){
      throw new Error('A proprety is empty in the User')
    }
  });
}