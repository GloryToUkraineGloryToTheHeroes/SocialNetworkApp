const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    isActivated:{
        type: Boolean,
        default: false
    },
    activationLink:{
        type: String
    },
    avatar:{
        type: String,
        default: null
    },
    chats:[{
        type: String
    }]
},{versionKey:false})

module.exports = mongoose.model('User', userSchema)