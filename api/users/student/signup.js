const express = require('express')
const signupRouter = require('express').Router()
const MySQLdatabase = require('../../../modules/database')
const bcrypt = require('bcryptjs')

signupRouter.use(express.json())

signupRouter.get('/', (req, res  , next) => {
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        MySQLdatabase.query(`INSERT INTO students (username , first_name , last_name , birth_date , email , password , sex) VALUES ( ${MySQLdatabase.escape(req.body.username)} , ${ MySQLdatabase.escape(req.body.first_name)} , ${ MySQLdatabase.escape(req.body.last_name)} , ${ MySQLdatabase.escape(req.body.birth_date)} , ${ MySQLdatabase.escape(req.body.email)} , ${ MySQLdatabase.escape(hash)} , ${MySQLdatabase.escape(req.body.sex)});` , (err , result)=>{
            err ? next(err) : res.status(201).json({error : false , message : 'success' , data : result})
        })
        
    });
});
})

module.exports = signupRouter