const express = require('express');
const router = express.Router();
const { login , register , verfiy } = require('../controllers/auth'); //controller
// middlewares
const { isAuth } = require("../middillware/auth");

//@desc login route
router.post('/login',login);

//@desc register route
router.post('/register',register);

//@desc verfiy user email
router.get('verify/:code', verfiy)

module.exports = router;