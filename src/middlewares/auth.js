const jwt = require("jsonwebtoken");
const config = require("../config/keys.json");

exports.isAuth = (req , res , next) => {
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

// authorize user roles and permisions
exports.authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.userData.role)) {
            console.log(req.user.role)
            return next(new ErrorResponse(
              `User role ${req.user.role} is not authorized to access this route`,
              403))
        }
        next();
    }
}