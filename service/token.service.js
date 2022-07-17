const jwt = require('jsonwebtoken')
const Token = require('../schemes/Token')

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '30d'})
        return{
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({user: userId})

        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = new Token({user: userId, refreshToken: refreshToken})
        await token.save()
        return token
    }

    async removeToken(refreshToken){
        const tokenData = await Token.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken){
        const tokenData = await Token.findOne({refreshToken})
        return tokenData
    }

    async validateAccesToken(token){
        try{
            const userData = jwt.verify(token, process.env.ACCESS_SECRET)
            return userData
        }catch(err){
            return null
        }
    }

    async validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.REFRESH_SECRET)
            return userData
        }catch(err){
            return null
        }
    }
}

module.exports = new TokenService()