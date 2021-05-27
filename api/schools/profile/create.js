const express = require("express");
const createSchool = express();
const MySqlDatabase = require("../../../modules/database");
const isAuthentcated = require("../../../validition/Auth");
const isTeacher = require("../../../validition/isTeacher");

createSchool.use(express.json());
createSchool.use(express.urlencoded({extended : true}));

createSchool.post("/" ,isAuthentcated , isTeacher ,(req , res , next)=>{
//INSERT INTO school ( founder , name , school_name , created_at , about) VALUES ()
MySqlDatabase.query(`INSERT INTO school ( founder , name , school_name , created_at , about) VALUES (${MySqlDatabase.escape(req.UserData.data.id)} , ${MySqlDatabase.escape(req.body.name)} , ${MySqlDatabase.escape(req.body.school_name)} , now() , ${MySqlDatabase.escape(req.body.about)})` , (err , result)=>{
err ? next(err) : res.status(201).json({error : false , message : "confra..tion for creating your school" , date : result});
});
});

module.exports = createSchool;