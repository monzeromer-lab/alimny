const jwt = require("jsonwebtoken");
const config = require("../config/keys.json");

module.exports.isAuth = (req , res , next) => {
    let token;
    if(req.headers.authorization){
        // eslint-disable-next-line quotes
        token = req.headers.authorization.split(' ')[1];
        jwt.verify( token , config.TokenSecret , function(err, decoded) {
        err ? next(err) : req.userData = decoded;
        next();
    }); 
    } else {
        res.status(401).json({error : true , message : "you are not authentecated" , data : []});
    } 
};