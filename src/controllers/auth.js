const User = require("../modules/user");
const bcrypt = require("bcryptjs");
const secret = require("../config/keys.json").TokenSecret;
const JWT = require("jsonwebtoken");
const { loginSchema } = require("../validition/userSchema.joi");
const registerValidate = require("../validition/userSchema.joi").registerSchema;
const multer = require("multer");
const path = require("path");
const sendEmail = require("../mail/mailProcess");

//@desc		Register a new user
//@route	POST /api/auth/register
//@access	Public
exports.register = async (req,res,next) => {
    try{

        // Validation
    	const body = await registerValidate.validate({
            username : req.body.username,
            password : req.body.password,
            firstName : req.body.firstName,
            lastName: req.body.lastName,
            email : req.body.email,
            image : req.body.image,
            birthDate : req.body.birthDate
        });

        // Check if user is already exists
        const user = await User.findOne({where: {email: body.value.email}});
        if(user){
            return res.status(401).json({
                error:true,
                message:"Email is already token"
            });
        }

        // Hash password and register a new user
        const salt = await bcrypt.genSalt(10);
        body.value.password = await bcrypt.hash(body.value.password,salt);
        const newUser = await User.create(body.value);
        await sendEmail(body.value.email);
        newUser.image = `\\${newUser.image}`;

        res.status(201).json({
            error:false,
            message:"Registered",
            data:newUser,
        });
    }catch(error){
        next(error);
    }
    // const user = await User.findOne({where: {username: body.value.username}});
    // if (user === null){
    //     const userEmail = await User.findOne({where: {email: body.value.email}});
    //     if (userEmail === null){
    //         bcrypt.genSalt(10, function (err, salt) {
    //             bcrypt.hash(body.value.password, salt, async function (err, hash) {
    //                 err ? next(err) : body.value.password = hash;
    //                 const register = await User.create(body.value);
    //                 await sendEmail(body.value.email);
    //                 register.image = `\\${register.image}`;
    //                 res.status(201).json(
    //                     {
    //                         success: true,
    //                         message: "Registed!",
    //                         data: register
    //                     }
    //                 );
    //             });
    //         });
    //     } else {
    //        res.status(406).json(
    //             {
    //                 error : true
    //                 ,message: "email is already used" ,
    //                 data : userEmail
    //             }
    //         );
    //     }
    // } else {
    //     res.status(406).json({error : true
    //     ,message: "username is already used" , data : user});
    // }
}

//@desc		Login user
//@route	POST /api/auth/register
//@access	Public
exports.login = async (req,res,next) => {
    try {

        //Validate request body
        const {username , password , email} = req.body
    	const body = await loginSchema.validate({ username, password, email});

        // find the user with the email
        const user = await User.findOne({ where: {email: body.value.email}});
        if(!user) {
            return res.status(404).json({error : true, message : "no user found with that email"});
        }

        // check if the password matches or not
        const matchedPassword = await bcrypt.compare(body.value.password,user.password);
        if(!matchedPassword){
         return res.status(404).json({error : true , message : "wrong password"});   
        }

        // sign in the user
        let token = JWT.sign({ id : user.id, role : user.role },
            secret,
            {expiresIn : "30d"}
        );
        res.status(200).json({
            error : false , 
            message : "logged in" , 
            data : user,
            token
        });

    }catch(error){
        next(error);
    }
    
    // if (user === null){
    //     res.status(404).json({error : true , message : "no user" , data : user});
    
    // } else {
    //    bcrypt.compare(body.value.password, user.password , async function(err, state) {
        
    //     let data = await User.findOne({
    //         attributes: [
    //         "username",
    //         "email",
    //         "firstName",
    //         "lastName",
    //         "image",
    //         "birthDate"
    //         ],
    //         where: {
    //             email: body.value.email
    //         }});
    //         if(err) {

    //              next(err);

    //         } else if (state) {
    //             let token = JWT.sign(
    //                 {
    //                     id : user.id,
    //                     role : user.role
    //                 },
     //                 secret,
    //                 {expiresIn : "30d"}
    //             );
    //             res.status(202).json({error : false , message : "logged in" , data : {profile : data , token : token}});
            
    //         } else {
    //             res.status(401).json({error : true , message : "password is wrong! Try Again" , data : []});
            
    //         }
    //     }); 
    // }
   
};

exports.verfiy = async (req,res,next) => {
    const state = await User.findOne({
    attributes: ["verified"],
    where: {
        verification_code: req.params.code
    } 
});

if (state && state.verified == 1){
    res.status(403).json({error : true , message : "user is already verifed!" ,data : []});

} else if (state && state.verified == 0){
    const userVerificationCode = await User.findOne({
        attributes: ["verification_code"],
        where: {
            verification_code: req.params.code
        } 
    });


    if (userVerificationCode === null) {
        res.status(401).json({error : true , message : "verification code is wrong"});
    
    } else {
        if(userVerificationCode.verification_code === req.params.code){
            
            await User.update({ verified: 1 }, {
                where: {
                    verification_code : req.params.code
                }
              });
            res.status(200).json({error : false , message : "verifed" , data : []});
        }
    }
} else {
    res.status(200).json({error : true , message : "maybe your verification code is wrong otherwise you're a hacker :)" , data : []});
}
}



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