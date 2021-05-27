const express = require("express");
const updateRouter = express();
const MySqlDatabase = require("../../../modules/database");
const IsAuthenteacted = require("../../../validition/Auth");
const IsOwner = require("../../../validition/profileOwner");

updateRouter.use(express.json());
updateRouter.use(express.urlencoded({extended: true}));

updateRouter.post("/" , IsAuthenteacted , IsOwner , (req , res , next)=>{
    MySqlDatabase.query(`SELECT * FROM teachers WHERE email = ${MySqlDatabase.escape(req.UserData.data.email)};` , (err , result)=>{
        err ? next(err) : result.length == 0 ? res.status(401).json({error : true , message : "please signup" , data: []}) : 
    MySqlDatabase.query(`UPDATE teachers SET username = ${MySqlDatabase.escape(req.body.username)} , birth_date = ${MySqlDatabase.escape(req.body.birth_date)} , first_name = ${MySqlDatabase.escape(req.body.first_name)}, last_name = ${MySqlDatabase.escape(req.body.last_name)} WHERE email = ${MySqlDatabase.escape(req.UserData.data.email)};` , (err , result)=>{
    err ? next(err) : res.status(201).json({error : false , message : "Profile Updated" , data : result});
});
});
});

module.exports = updateRouter;