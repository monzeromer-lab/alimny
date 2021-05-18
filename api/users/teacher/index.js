const index = require('express').Router()

index.use('/teachers/login' , require('./login'))

index.use('/teachers/signup' , require('./signup'))

module.exports = index