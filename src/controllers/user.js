const express = require("express");
const User = require("../modules/user");
const { updateProfile } = require("../validition/profileSchema.joi");
const updateRouter = express();

//@desc     Get all the users
//@route    Get /api/User/
//@access   Private/Admin
exports.getUsers = async (req,res,next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      success:true,
      data:users
    });
  }
  catch(error){
    next(error)
  }
}


//@desc		  Update user profile
//@route	  PUT /api/auth/register
//@access   Private/Admin
exports.updateProfile = async (req,res,next) => {
  try {
  	const body = await updateProfile.validate({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      birthDate : req.body.birthDate
    });

    // eslint-disable-next-line no-unused-vars
    const user = await User.update({ 
      firstName : body.value.firstName,
      lastName : body.value.lastname,
      birthDate : body.value.birthDate
    }, {
      where: {
        id : req.userData.id
      }
    });

    res.status(201).json({
      error : false ,
      message : "profile updated succssefully!",
      data : user
    });

  }catch(error){
    next(error)
  }

};
