const express = require("express");
const updateSchool = express();
const MySqlDatabase = require("../../../modules/database");
const isAuthentcated = require("../../../validition/Auth");
const isTeacher = require("../../../validition/isTeacher");
const isOwner = require("../../../validition/isSchoolOwner");

updateSchool.use(express.json());
updateSchool.use(express.urlencoded({extended : true}));

//TODO: edit a scpisifc authentacation file to add school id in the teacher token
//TODO: add type to tokens.data in login
//TODO: create new middileware to check if the teacher is the owner of this school

updateSchool.post("/" , isAuthentcated , isTeacher , isOwner ,(req , res , next)=>{
MySqlDatabase.query(`UPDATE school SET name = ${MySqlDatabase.escape(req.body.name)} , about =  ${MySqlDatabase.escape(req.body.about)}) WHERE founder = ${MySqlDatabase.escape(req.UserData.data.id)}` , (err , result)=>{
err ? next(err) : res.status(201).json({error : false , message : "confra..tion for creating your school" , date : result});
});
});

module.exports = updateSchool;