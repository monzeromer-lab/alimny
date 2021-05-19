const express = require('express')
const loginRouter = require('express')()
const MySQLdatabase = require('../../../modules/database')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const JsonWebTokenCode = require('../../../config/keys.json').TokenSecret

loginRouter.use(express.json())
loginRouter.use(express.urlencoded({ extended: true }))

loginRouter.post('/', (req, res , next) => {
MySQLdatabase.query(`SELECT * FROM teachers WHERE email = ${MySQLdatabase.escape(req.body.email)};` , (err , result)=>{
if (err) {
    next(err)
} else if(result.length <= 0) {
    console.log(result)
    res.status(401).json({error : true, message : 'email not found please signup and try again', data : []}) 
} else {
    bcrypt.compare(req.body.password, result[0].password, function(err, state) {
        let data = {
            profile : {
                id : result[0].id,
                firstName: result[0].first_name,
                lastName: result[0].last_name,
                Profle : result[0].profile_pic,
                birthDate : result[0].birth_date,
                username : result[0].username,
                role : result[0].role,
                email : result[0].email
            },
            token : undefined  
        }
        if (state){
            data.token = JWT.sign({ data: data.profile}, JsonWebTokenCode, { expiresIn: '31d' })
            res.status(202).json({error : false , message : 'Accepted' , data : data})
        } else {
            res.status(401).json({error : true, message : 'password is wrong', data : []})
        }
    
    })
}
})
  
})

module.exports = loginRouter