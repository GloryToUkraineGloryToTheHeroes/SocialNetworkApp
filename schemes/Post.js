const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image:{
        type: String,
        default: null
    },
    description:{
        type: String,
        default: null
    }
},{versionKey:false})

module.exports = mongoose.model('Post', postSchema)