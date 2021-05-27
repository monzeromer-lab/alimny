const JWT = require("jsonwebtoken");
const TokenSecret = require("../config/keys.json").TokenSecret;

module.exports =  (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, TokenSecret);
    console.log(decoded);
    !req.headers.authorization ? res.status(401).json({error : true , message : "unauth" , data : []}) :
    req.UserData = decoded;
    next();
};
