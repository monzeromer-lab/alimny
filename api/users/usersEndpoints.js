const users = require('express').Router()

users.use('/users' , require('./admin/index'))
users.use('/users' , require('./student/index'))
users.use('/users' , require('./teacher/index'))

module.exports = users