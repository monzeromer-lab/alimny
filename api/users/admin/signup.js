const express = require("express");
const signupRouter = require("express")();
const MySQLdatabase = require("../../../modules/database");
const bcrypt = require("bcryptjs");
const multer  = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
  });
   
const upload = multer({ storage: storage });
signupRouter.use(express.json());
signupRouter.use(express.urlencoded({ extended: true }));

signupRouter.post("/", upload.single("image") , (req, res  , next) => {
console.log(req.body.username);
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        MySQLdatabase.query(`INSERT INTO users (username , profile_pic , first_name , last_name , birth_date , email , password ) VALUES ( ${MySQLdatabase.escape(req.body.username)} , ${MySQLdatabase.escape(req.file.path)} , ${ MySQLdatabase.escape(req.body.first_name)} , ${ MySQLdatabase.escape(req.body.last_name)} , ${ MySQLdatabase.escape(req.body.birth_date)} , ${ MySQLdatabase.escape(req.body.email)} , ${ MySQLdatabase.escape(hash)});` , (err , result)=>{
            err ? next(err) : res.status(201).json({error : false , message : "success" , data : result});
        });
        
    });
});
});

module.exports = signupRouter;