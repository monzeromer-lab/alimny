const index = require('express').Router()

index.use('/admin/login' , require('./login'))

index.use('/admin/signup' , require('./signup'))

module.exports = index