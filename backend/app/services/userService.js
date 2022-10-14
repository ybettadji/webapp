import UserSchema from "../externalServices/databases/mongodb/models/User.js";
import bcrypt from 'bcrypt'

const createUserInDB = async (user) => {
    const newUser = new UserSchema(user)

    try {
        return await newUser.save();
    } catch (err) {
        throw new Error("The user has not been created in the Database");
    }
}

const findOneUserByProperty = async (request) => {
    try {
        const userFound = await UserSchema.findOne(request)
        return userFound
    } catch (err) {
        throw new Error("The user does not exist");
    }
}

const findUserById = async (id) => {

    try {
        return await UserSchema.findById(id)
    } catch (err) {
        throw new Error("The user does not exist");
    }
}

const findOneByIdAndUpdate = async (id, update) => {
    try {
        return await UserSchema.findOneAndUpdate({_id: id}, update)
    } catch (err) {
        throw new Error("The user does not exist");
    }
}

const paswordEncrypter = async (password) => {
    return await bcrypt.hash(password, 10);
} 

const comparePasswords = async (plaintextPassword, cryptedPassword) => {
    return await bcrypt.compare(plaintextPassword, cryptedPassword)
}

export default {
    createUserInDB,
    findOneUserByProperty,
    findUserById,
    findOneByIdAndUpdate,
    paswordEncrypter,
    comparePasswords
}

