const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const User = require('../schemes/User')
const EmailService = require('./email.service')
const TokenService = require('./token.service')

class UserService{

    async signup(name, password, email){
        try{
            const hPassword = bcrypt.hashSync(password, 7)

            const activationLink = uuid.v4()

            const user = new User({
                name: name,
                password: hPassword,
                email: email,
                activationLink: activationLink
            })

            await user.save()

            await EmailService.sendActivationLink(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

            const tokens = TokenService.generateTokens({
                name: user.name,
                id: user._id,
                email: user.email,
                isActivated: user.isActivated
            })

            await TokenService.saveToken(user._id, tokens.refreshToken)

            return {...tokens, user}
 
        }catch(err){
            console.log(err)
        }
    }

    async activate(activationLink){
        const user = await User.findOne({activationLink: activationLink})
        if(!user){
            throw new Error('Incorrect link')
        }
        user.isActivated = true
        await user.save()
    }

    async login(name, password, email){
        try{
            const data = await User.findOne({email})

            const tokens = TokenService.generateTokens({
                name: data.name,
                id: data._id,
                email: data.email,
                isActivated: data.isActivated
            })

            await TokenService.saveToken(data._id, tokens.refreshToken)

            return {...tokens, data}
        }catch(err){
            console.log(err)
        }
    }

    async logout(refreshToken){
        try{
            const token = await TokenService.removeToken(refreshToken)
            return token
        }catch(err){
            console.log(err)
        }
    }

    async refresh(refreshToken){
        try{
            const userData = await TokenService.validateRefreshToken(refreshToken)
            const tokenDB = await TokenService.findToken(refreshToken)

            if(!userData || !tokenDB){
                throw new Error('User is not authorized')
            }

            const data = await User.findById(userData._id)///Prosto id?????

            const tokens = TokenService.generateTokens({
                name: data.name,
                id: data._id,
                email: data.email,
                isActivated: data.isActivated
            })

            await TokenService.saveToken(data._id, tokens.refreshToken)

            return {...tokens, data}
        }catch(err){
            console.log(err)
        }
    }

    async getUsers(){
        const users = await User.find({})
        return users
    }

}

module.exports = new UserService()