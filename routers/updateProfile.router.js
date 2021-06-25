const express = require("express");
const users = require("../modules/user");
const { isAuth } = require("../middillware/auth");
const { updateProfile } = require("../validition/profileSchema.joi");
const updateRouter = express();

updateRouter.use(express.json());
updateRouter.use(express.urlencoded({extended : true}));

updateRouter.post("/api/users/profile/update" , isAuth , async (req , res , next) => {
  const body = await updateProfile.validate({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    birthDate : req.body.birthDate
  });

  // eslint-disable-next-line no-unused-vars
  const state = await users.update({ firstName : body.value.firstName,
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

});

module.exports = updateRouter;