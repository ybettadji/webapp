import jsonwebtoken from 'jsonwebtoken'

const createToken = (payload, secretKey, config) => {
    return jsonwebtoken.sign(payload, secretKey, config)
}

const verifyToken = (token, secretKey) => {
        return jsonwebtoken.verify(token, secretKey)
}

export default {
    createToken,
    verifyToken
}