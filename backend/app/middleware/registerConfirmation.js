import tokenService from "../services/tokenService.js";

export const middlewareRegisterConfirmation = (req, res, next) => {
    try {
        const token = req.params.token
        const verifiedToken = tokenService.verifyToken(token)
        req.params.id = verifiedToken.userId
        next()
    } catch (error) {
       res.status(401).json({error})
    }
}
