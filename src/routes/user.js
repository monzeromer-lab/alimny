const express = require('express');
const router = express.Router();
const { getUsers , updateProfile } = require('../controllers/user'); //controller
// middlewares
const { isAuth } = require("../middillware/auth");

//@desc  Get all users
router.get('/',getUsers);

//@desc  update user profile details
router.put('/update-profile',updateProfile);

module.exports = router;