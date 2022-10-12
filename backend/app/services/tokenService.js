
import jsonwebtokenService from "../externalServices/tokens/jsonwebtokenService.js"

const createRegistrationToken = (user) => {
    const payload = {userId: user._id}
    const secretKey = process.env.JWT_SECRET_KEY
    const config = {};
    return jsonwebtokenService.createToken(payload, secretKey, config)
}

const verifyToken = (token) => {
    const secretKey = process.env.JWT_SECRET_KEY
    return jsonwebtokenService.verifyToken(token, secretKey)
}

export default {
    createRegistrationToken,
    verifyToken
}