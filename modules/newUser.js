const MySQLdatabase = require("./database");
const bcrypt = require("bcryptjs");


module.exports = {
/**
 * @description create new user
 * @param {string} username 
 * @param {string} password 
 * @param {string} sex 
 * @param {string} type 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {date} birthDate 
 * @param {string} email 
 * @param {*string} profilePic 
 */
    new : (username , password , sex , type , firstName , lastName , birthDate , email , profilePic)=>{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                MySQLdatabase.query(`INSERT INTO  (username , profile_pic , first_name , last_name , birth_date , email , password ) VALUES ( ${MySQLdatabase.escape(username)} , ${MySQLdatabase.escape(profilePic)} , ${ MySQLdatabase.escape(firstName)} , ${ MySQLdatabase.escape(lastName)} , ${ MySQLdatabase.escape(birthDate)} , ${ MySQLdatabase.escape(email)} , ${ MySQLdatabase.escape(hash)});` , (err , result)=>{
                    
                });
            });
        }); 
    }
};