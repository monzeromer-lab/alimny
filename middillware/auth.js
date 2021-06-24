const jwt = require("jsonwebtoken");
const config = require("../config/keys.json");

module.exports = (req , res , next) => {
    // eslint-disable-next-line quotes
    let token = req.headers.authorization.split(' ')[1];

    jwt.verify( token , config.TokenSecret , function(err, decoded) {
        err ? next(err) : req.userData = decoded;
        next();
    });   
};