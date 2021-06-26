const express = require('express');
const router = express.Router();
const { getUsers , updateProfile } = require('../controllers/user'); //controller
// middlewares
const { isAuth , authorize } = require("../middlewares/auth");

router.use(isAuth);
router.use(authorize('admin'));

//@desc  Get all users
router.get('/',getUsers);

//@desc  update user profile details
router.put('/update-profile',updateProfile);

module.exports = router;