const express = require("express");
const users = require("../modules/user");
const verifyRouter = express();

verifyRouter.use(express.json());
verifyRouter.use(express.urlencoded({extended : true}));

verifyRouter.get("/api/users/verify/:code"  , async (req , res) => {
const state = await users.findOne({
    attributes: ["verified"],
    where: {
        verification_code: req.params.code
    } 
});

if (state && state.verified == 1){
    res.status(403).json({error : true , message : "user is already verifed!" ,data : []});

} else if (state && state.verified == 0){
    const userVerificationCode = await users.findOne({
        attributes: ["verification_code"],
        where: {
            verification_code: req.params.code
        } 
    });


    if (userVerificationCode === null) {
        res.status(401).json({error : true , message : "verification code is wrong"});
    
    } else {
        if(userVerificationCode.verification_code === req.params.code){
            
            await users.update({ verified: 1 }, {
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

});

module.exports = verifyRouter;