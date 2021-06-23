const express = require("express");

const loginRouter = express();

loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended : true}));

loginRouter.post("/api/users/register" , (req , res , next) => {

});

module.exports = loginRouter;