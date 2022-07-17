const UserService = require('../service/user.service')
const User = require('../schemes/User')
const Token = require('../schemes/Token')
const bcrypt = require('bcryptjs')
const fs = require('fs')

class UserController{
    async signup(req, res, next){
        try{
            const {name, password, email} = await req.body

            if(name.length < 3 || name.length > 10){
                return res.status(400).json({message: 'Incorrect name, min length is 3 symbols and max 10 symbols'})
            }

            if(password.length < 3 || password.length > 10){
                return res.status(400).json({message: 'Incorrect password, min length is 3 symbols and max 10 symbols'})
            }

            var isEmail = false

            function validateEmail(someEmail) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                isEmail = re.test(String(someEmail).toLowerCase());
            }

            validateEmail(email)

            if(!isEmail){
                return res.status(400).json({message: 'Incorrect email'})
            }

            const data = await User.findOne({name})

            if(data){
                return res.status(400).json({message: 'User exists'})
            }

            const dataE = await User.findOne({email})
    
            if(dataE){
                return res.status(400).json({message: 'This email already has account'})
            }

            const userData = await UserService.signup(name, password, email)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            fs.mkdirSync(`${process.env.STATIC_PATH}/${userData.user.id}`)
            fs.mkdirSync(`${process.env.STATIC_PATH}/${userData.user.id}/avatar`)
            fs.mkdirSync(`${process.env.STATIC_PATH}/${userData.user.id}/posts`)

            return res.json(userData)
        }catch(err){
            next(err)
        }
    }

    async login(req, res, next){
        try{
            const {name, password, email} = await req.body

            const data = await User.findOne({email})

            if(!data){
                return res.status(400).json({message: 'User is not found'})
            }

            const correctPassword = await bcrypt.compare(password, data.password)

            if(!correctPassword){
                return res.status(400).json({message: 'Incorrect password'})
            }

            if(name !== data.name){
                return res.status(400).json({message: 'Incorrect name'})
            }

            const userData = await UserService.login(name, password, email)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)

        }catch(err){
            next(err)
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch(err){
            next(err)
        }
    }

    async activate(req, res, next){
        try{
            const activationLink = await req.params.link
            await UserService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        }catch(err){
            next(err)
        }
    }

    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies///AWAIT ??????????????
            if(!refreshToken){
                res.status(401).json('User is not authorized')
            }
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch(err){
            next(err)
        }
    }

    async getUsers(req, res, next){
        try{
            const input = req.headers.send

            const result = await User.find({"name": {$regex: '^' + input, $options: 'i'}})

            return res.status(201).json(result)
        }catch(err){
            next(err)
        }     
    }

    async check(req, res, next){
        try{
            const ID = req.headers.id
            const user = await User.findById(ID)
            return res.json(user)
        }catch(err){
            next(err)
        }     
    }

    async addChat(req, res, next){
        try{
            const input = req.body.chatId
            const ID = req.body.id

            const user = await User.findById(ID)

            const extra = user.chats
            
            extra.push(input)
            user.chats = extra
            await user.save()

            return res.json(extra)
        }catch(err){
            next(err)
        }     
    }

    async checkChat(req, res, next){
        try{
            const input = req.body.chatId
            const ID = req.body.id

            const user = await User.findById(ID)

            const extra = user.chats

            for(let i = 0; i < extra.length; i++ ){
                if(extra[i] == input){
                    return res.json(true)
                }
            }

            return res.json(false)
        }catch(err){
            next(err)
        }     
    }

    async getChats(req, res, next){
        try{
            const ID = req.headers.id

            const user = await User.findById(ID)

            const chats = user.chats

            const extra = []

            for(let i = 0; i < chats.length; i++){
                const elem = await User.findById(chats[i])
                extra.push(elem)
            }

            return res.json(extra)
        }catch(err){
            next(err)
        }     
    }

    async editName(req, res, next){
        try{
            const ID = req.headers.id
            const user = await User.findById(ID)

            const {name, password} = await req.body

            const correctPass = await bcrypt.compare(password, user.password)
            if(!correctPass){
                return res.status(400).json({message: 'Incorrect password'})
            }

            if(name.length < 3 || name.length > 10){
                return res.status(400).json({message: 'Incorrect name, min length is 3 symbols and max 10 symbols'})
            }

            if(user.name == name){
                return res.status(400).json({message: 'It is old name'})
            }
            

            const candidate = await User.findOne({name: name})
            if(candidate){
                return res.status(400).json({message: 'User with this name exists'})
            }


            user.name = name

            await user.save()
            return res.json({user, correct: true})
        }catch(err){
            next(err)
        }
    }

    async editPass(req, res, next){
        try{
            const ID = req.headers.id
            const user = await User.findById(ID)

            const {oldPass, firstPass, secondPass} = await req.body

            if(oldPass.length < 3 || oldPass.length > 10){
                return res.status(400).json({message: 'Incorrect password, min length is 3 symbols and max 10 symbols'})
            }

            if(firstPass.length < 3 || firstPass.length > 10){
                return res.status(400).json({message: 'Incorrect password, min length is 3 symbols and max 10 symbols'})
            }

            if(secondPass.length < 3 || secondPass.length > 10){
                return res.status(400).json({message: 'Incorrect password, min length is 3 symbols and max 10 symbols'})
            }

            if(firstPass !== secondPass){
                return res.status(400).json('Input passwords are not the same')
            }

            if(firstPass == oldPass || secondPass == oldPass){
                return res.status(400).json('New password can not be same like old')
            }

            const correctPass = await bcrypt.compare(oldPass, user.password)
            if(!correctPass){
                return res.status(400).json({message: 'Incorrect password'})
            }

            const hPassword = bcrypt.hashSync(firstPass, 7)

            user.password = hPassword

            await user.save()

            return res.json('Password has been edited' + firstPass)
        }catch(err){
            next(err)
        }     
    }

    
}

module.exports = new UserController()


