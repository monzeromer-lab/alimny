const express = require('express');
const router = express.Router();
const { getUsers , getUser ,updateProfile } = require('../controllers/user'); //controller
// middlewares
const { isAuth , authorize } = require("../middlewares/auth");

router.use(isAuth);
router.use(authorize('admin'));

//@desc  Get all users
router.get('/',getUsers);

//@desc  Get one user
router.get('/:id',getUser);

//@desc  update user profile details
router.put('/update-profile',updateProfile);

module.exports = router;