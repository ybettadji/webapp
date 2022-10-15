import jsonWebTokenService from '../externalServices/tokens/jsonwebtokenService.js'
import userService from "../services/userService.js";
import tokenService from "../services/tokenService.js";

export const verifyAccess = async (req, res , next) => {
    const { token } = req.body

    const retrieveIdFromPayloadOfJwtToken = (token) => {
        return jsonWebTokenService.retrieveIdFromPayloadOfJwtToken(token)
    }

    const findUserByIdInDB = async (userId) => {
        return await userService.findUserById(userId)
    }

    const verifyToken = (user) => {
        return tokenService.verifyToken(token, process.env.JWT_SECRET_KEY + user.password)
    }

    return Promise.resolve(token)
            .then(retrieveIdFromPayloadOfJwtToken)
            .then(findUserByIdInDB)
            .then(verifyToken)
            .then((verifiedToken) => {
                req.body.id = verifiedToken.userId
                next()
            })
            .catch(error => res.status(401).json({message: "Unauthorized access"}))

} 