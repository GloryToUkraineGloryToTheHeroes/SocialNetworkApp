const User = require('../schemes/User')
const Post = require('../schemes/Post')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')


class FileController{
    async uploadAvatar(req, res){
        try{
            let imageFile = req.files.file

            if(!imageFile){
                return res.status(400).json('Upload file')
            }

            fs.rmdirSync(`${process.env.STATIC_PATH}/${req.body.id}/avatar`, { recursive: true })
            fs.mkdirSync(`${process.env.STATIC_PATH}/${req.body.id}/avatar`)

            const filePath = uuid.v4()

            const fullFilePath = filePath + '.' + req.body.filename

            imageFile.mv(`${process.env.STATIC_PATH}/${req.body.id}/avatar/${fullFilePath}.jpg`, function(err) {
                if (err) {
                    return res.status(500).send(err)
                }
            
                //res.json({file: `static/${req.body.filename}.jpg`})
            })

            const user = await User.findById(req.body.id)
            const userAvatar = `${req.body.id}/avatar/${fullFilePath}.jpg`
            user.avatar = userAvatar
            await user.save()
            //console.log(user)

            res.json({message: user.avatar})

        }catch(err){
            return res.status(400).json({message: 'Upload avatar error'})
        }
    }

    async deleteAvatar(req, res){
        try{
            const ID = req.body.id
            const user = await User.findById(ID)
            fs.unlinkSync(process.env.STATIC_PATH + '\\' + user.avatar)
            user.avatar = null
            await user.save()
            return res.json({message: 'Avatar has been deleted'})
        }catch(err){
            return res.status(400).json({message: 'Delete avatar error'})
        }
    }

    async getAvatar(req, res){
        try{
            const ID = req.headers.id
            const user = await User.findById(ID)
            const filePath = user.avatar
            return res.json(filePath)
        }catch(err){
            return res.status(400).json({message: 'Get avatar error'})
        }
    }

    async uploadPost(req, res){
        try{
            /*
            
            make dir for avatar and for posts
            
            */
            
            let imageFile = req.files.file

            if(!imageFile){
                return res.status(400).json('Upload file')
            }



            const filePath = uuid.v4()

            const fullFilePath = filePath + '.' + req.body.filename

            imageFile.mv(`${process.env.STATIC_PATH}/${req.body.id}/posts/${fullFilePath}.jpg`, function(err) {
                if (err) {
                    return res.status(500).send(err)
                }
            
                //res.json({file: `static/${req.body.filename}.jpg`})
            })

            //`${req.body.id}/posts/${fullFilePath}.jpg`

            //const user = await Post.findOne({user: req.body.id})

            const newPost = new Post({
                user: req.body.id,
                image: `${req.body.id}/posts/${fullFilePath}.jpg`,
                description: 'post okey, post'
            })

            await newPost.save()



            return res.json({newPost})

        }catch(err){
            return res.status(400).json({message: 'Upload post error'})
        }
    }

    async getPost(req, res){
        try{
            const ID = req.headers.id
            const posts = await Post.find({user: ID})
            return res.json(posts)
        }catch(err){
            return res.status(400).json({message: 'Get post error'})
        }
    }

}

module.exports = new FileController()




/*


const file = req.body.file
            
            if(file){
                const Path = 'C:\\Users\\coman\\Training 13\\static'

                fs.rmdirSync(Path, { recursive: true })
                fs.mkdirSync(Path)

                const sukaName = uuid.v4() + '.txt'
                
                fs.writeFileSync(`${Path}\\${sukaName}`, file, err => {
                    if(err) console.log(err)
                    console.log('ok')
                })

                console.log(file)
                return res.status(201).json(file)
            }
            console.log('skam')
            return res.json('BLET')

*/


/*



const file = req.body.suka
            console.log(file)
            const ID = req.headers.id
            const user = await User.findById(ID)
            const avatarName = uuid.v4() + '.jpg'
            file.mv(process.env.STATIC_PATH + '\\' + avatarName)
            user.avatar = avatarName
            await user.save()
            return res.json({message: 'Avatar has been uploated'})


const image = await new Image({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })
            const stat = await image.save()
            return res.json(stat)


*/