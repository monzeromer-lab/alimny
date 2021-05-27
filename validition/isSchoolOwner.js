const MySqlDatabase = require("../modules/database");

module.exports = (req , res , next)=>{
    MySqlDatabase.query("" , (err , result)=>{
        err ? next(err) : req.UserData.data.id == result[0].founder ? next() : res.status(401).json({error : true , message : "You Are Not Allowd To Edit This School" , data : []});
    });
};