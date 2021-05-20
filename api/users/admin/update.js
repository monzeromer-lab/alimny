const updateRouter = require("express")()
const FileSystem = require("fs")
const multer = require("multer")
const MySqlDatabase = require('../../../modules/database')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
const upload = multer({ storage: storage })
updateRouter.post("/" , upload.single("image"), (req, res, next)=>{
    MySqlDatabase.query(`SELECT * FROM users WHERE email = ${req.UserData.email}` , (err , result)=>{
        err ? next(err) : result.length == 0 ? res.status(401).json({error : true , message : "please signup" , data: []}) : 
    FileSystem.unlinkSync(result[0].profile_pic) 
    MySqlDatabase.query(`INSERT INTO users (username , profile_pic , birth_date , first_name , last_name ) VALUSE ( ${MySqlDatabase.escape(req.body.username)} , ${MySqlDatabase.escape(req.file.path)} , ${MySqlDatabase.escape(req.body.birth_date)} , ${MySqlDatabase.escape(req.body.first_name)} , ${MySqlDatabase.escape(req.body.last_name)} )` , (err , result)=>{
    err ? next(err) : res.status(201).json({error : false , message : "Profile Updated" , data : result})
})
})
})

module.exports = updateRouter