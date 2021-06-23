const express = require("express");
const users = require("../modules/user");
const bcrypt = require("bcryptjs");
const secret = require("../config/keys.json").TokenSecret;
const JWT = require("jsonwebtoken");
const { loginSchema } = require("../validition/userSchema.joi");
const loginRouter = express();

loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended : true}));

loginRouter.get("/api/users/login" , async (req , res , next) => {
    const body = await loginSchema.validate({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    });

    const userName = await users.findOne({ where: {email: body.value.email}});
    
    if (userName === null){
        res.status(404).json({error : true , message : "no user" , data : userName});
    
    } else {
       bcrypt.compare(body.value.password, userName.password , async function(err, state) {
        
        let data = await users.findOne({
            attributes: [
            "username",
            "email",
            "firstName",
            "lastName",
            "image",
            "birthDate"
            ],
            where: {
                email: body.value.email
            }});
            if(err) {

                 next(err);

            } else if (state) {
                let token = JWT.sign(
                    {
                        id : userName.id,
                        role : userName.role
                    },
                    secret,
                    {expiresIn : "30d"}
                );
                res.status(202).json({error : false , message : "logged in" , data : {profile : data , token : token}});
            
            } else {
                res.status(401).json({error : true , message : "password is wrong! Try Again" , data : []});
            
            }
        }); 
    }
    
});

module.exports = loginRouter;