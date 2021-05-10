const indexRouter = require('express').Router()

indexRouter.get('/home' , (req , res)=>{
    res.status(200).json({error: false , message : 'success!' , data : []})
})

module.exports = indexRouter