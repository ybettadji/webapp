import jsonwebtokenService from "../externalServices/tokens/jsonwebtokenService.js"

const createRegistrationConfirmationToken = (user) => {
    const payload = {userId: user._id}
    const secretKey = process.env.JWT_SECRET_KEY + user.status
    const config = {};
    return jsonwebtokenService.createToken(payload, secretKey, config)
}

const createResetPasswordToken = (user) => {
    const payload = {userId: user._id}
    const secretKey = process.env.JWT_SECRET_KEY + user.password
    const config = {expiresIn: '15m'};
    return jsonwebtokenService.createToken(payload, secretKey, config)
}

const createLoginToken = (user) => {
    const payload = {userId: user._id}
    const secretKey = process.env.JWT_SECRET_KEY + user.password
    const config = {expiresIn: '1d'};
    return jsonwebtokenService.createToken(payload, secretKey, config)

}

const verifyToken = (token, secretKey) => {
    return jsonwebtokenService.verifyToken(token, secretKey)
}


export default {
    createRegistrationConfirmationToken,
    createResetPasswordToken,
    verifyToken,
    createLoginToken
}
