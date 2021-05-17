const indexRouter = require('express').Router()

indexRouter.use('/api' , require('./users/usersEndpoints'))

module.exports = indexRouter