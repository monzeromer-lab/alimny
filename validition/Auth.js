const JWT = require("jsonwebtoken");
const TokenSecret = require("../config/keys.json").TokenSecret;

module.exports =  (req, res, next) => {
    let token = "";
    let decoded = {};
    if (!req.headers.authorization ){
        res.status(401).json({error : true , message : "unauth" , data : []});  
        token = req.headers.authorization.split(" ")[1];
        decoded = JWT.verify(token, TokenSecret);
        req.UserData = decoded;
        next();
    }
};
