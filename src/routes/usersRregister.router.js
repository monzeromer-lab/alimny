const express = require("express");
const users = require("../modules/user");
const registerValidate = require("../validition/userSchema.joi").registerSchema;
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const sendEmail = require("../mail/mailProcess");
const loginRouter = express();

loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended : true}));

const  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./public/images/");
    },
    filename: function (req, file, cb) {
      cb(null, "IMG-" + Date.now() + path.extname(file.originalname));
    }
  });
  
const  upload = multer({
    storage: storage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error("Please upload a jpg Image with less than 1MB size"));
       }
     cb(undefined, true);
 }
 });

loginRouter.post("/api/users/register" ,upload.single("image") ,async (req , res , next) => {

    const body = await registerValidate.validate({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        email : req.body.email,
        image : req.body.image,
        birthDate : req.body.birthDate
    });
    
    const userName = await users.findOne({where: {username: body.value.username}});
    if (userName === null){
        const userEmail = await users.findOne({where: {email: body.value.email}});
        if (userEmail === null){
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(body.value.password, salt, async function (err, hash) {
                    err ? next(err) : body.value.password = hash;
                    const register = await users.create(body.value);
                    await sendEmail(body.value.email);
                    register.image = `\\${register.image}`;
                    res.status(201).json(
                        {
                            error: true,
                            message: "Registed!",
                            data: register
                        }
                    );
                });
            });
        } else {
           res.status(406).json(
                {
                    error : true
                    ,message: "email is already used" ,
                    data : userEmail
                }
            );
        }
    } else {
        res.status(406).json({error : true
        ,message: "username is already used" , data : userName});
    }
});

module.exports = loginRouter;