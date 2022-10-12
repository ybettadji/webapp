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
  }
   
}

export class UserEmailWithPasswordEntity {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
  }

  validate(user) {
    checkIfPropertiesArePresent(user, "email", "password")
    checkIfPropertiesAreEmpty(this.email, this.password)
    checkIfEmailFormatIsValid(this.email)
  }
}


//------------------------------------------------------------

const checkIfEmailFormatIsValid = (email) => {
  const emailIsValid = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (!emailIsValid) {
    throw new Error("Invalid Email");
  }
}

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