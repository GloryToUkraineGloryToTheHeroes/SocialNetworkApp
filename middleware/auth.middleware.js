const TokenService = require('../service/token.service')

module.exports = async function(req, res, next){
    try{
        const authHeader = req.headers.authorization
        if(!authHeader){
            return next(new Error('User is not authorized'))
        }

        const accessToken = authHeader.split(' ')[1]
        if(!accessToken){
            return next(new Error('User is not authorized'))
        }

        const userData = TokenService.validateAccesToken(accessToken)
        if(!userData){
            return next(new Error('User is not authorized'))
        }

        req.user = userData
        next()
    }catch(err){
        return next(new Error('User is not authorized'))
    }
}