const express = require("express");
const User = require("../modules/user");
const { isAuth } = require("../middillware/auth");
const { updateProfile } = require("../validition/profileSchema.joi");
const updateRouter = express();

//@desc   Get all the users
//@route  Get /api/User/
//@access Private/Admin
exports.getUsers = async (req,res,next) => {
  const users = await User.findAll();
  return res.status(200).json({
    success:true,
    data:users
  });
}


//@desc		Register a new user
//@route	POST /api/auth/register
//@access	Public
exports.updateProfile = async (req,res,next) => {
	const body = await updateProfile.validate({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    birthDate : req.body.birthDate
  });

  // eslint-disable-next-line no-unused-vars
  const state = await User.update({ firstName : body.value.firstName,
     lastName : body.value.lastname,
     birthDate : body.value.birthDate
    }, {
    where: {
      id : req.userData.id
    }
  });

  if (state === null){
    next("cannot update your profile");
  } else {
    res.status(200).json({error : false , message : "profile updated succssefully!" , data : state});
  }

};
