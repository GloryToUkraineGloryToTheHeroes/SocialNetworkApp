require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const User = require('./schemes/User')
const PORT = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/static'))
app.use(cookieParser())
app.use('/auth', require('./router/user.router'))
app.use('/files', require('./router/file.router'))
app.use('/static', express.static(__dirname + '/static'))
    
const run = async() => {
    try{
        await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        console.log('connect')
        const result = await User.find({})
    }catch(err){
        console.log(err)
    }
}

run()

app.listen(PORT, '127.0.0.1', () => {
    console.log('Arbeiten auf PORT: ' + PORT)
})