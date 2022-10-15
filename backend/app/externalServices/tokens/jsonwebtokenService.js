import jsonwebtoken from 'jsonwebtoken'

const createToken = (payload, secretKey, config) => {
    return jsonwebtoken.sign(payload, secretKey, config)
}

const verifyToken = (token, secretKey) => {
        return jsonwebtoken.verify(token, secretKey)
}

const retrieveIdFromPayloadOfJwtToken = (token) => {
    const jwtParts = token.split('.')
    const buff = new Buffer.from(jwtParts[1], 'base64');
    const payloadExtracted = JSON.parse(buff.toString('ascii'));
    const userId = payloadExtracted.userId
    return userId
}

export default {
    createToken,
    verifyToken,
    retrieveIdFromPayloadOfJwtToken
}