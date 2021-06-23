const express = require("express");
const users = require("../modules/user");
const registerValidate = require("../validition/userSchema.joi").registerSchema;
var bcrypt = require("bcryptjs");
const loginRouter = express();

loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended : true}));

loginRouter.post("/api/users/register" ,async (req , res , next) => {

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