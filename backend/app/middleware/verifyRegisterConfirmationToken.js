import tokenService from "../services/tokenService.js";
import userService from "../services/userService.js";
import jsonWebTokenService from '../externalServices/tokens/jsonwebtokenService.js'
/*
When a user registers, a jwt token is generated in the link that is sent by email. 
Here we check that the token is valid 
the secretKey is the process.env.JWT_SECRET_KEY + the user status (normally set to 'inactive')
*/
export const verifyRegisterConfirmationToken = async (req, res, next) => {
        const token = req.params.token

        const retrieveIdFromPayloadOfJwtToken = (token) => {
            return jsonWebTokenService.retrieveIdFromPayloadOfJwtToken(token)
        }

        const findUserByIdInDB = async (userId) => {
            return await userService.findUserById(userId)
        }

        const verifyToken = (user) => {
            return tokenService.verifyToken(token, process.env.JWT_SECRET_KEY + user.status)
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