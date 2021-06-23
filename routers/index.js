const indexRouter = require("express").Router();
const loginRouter = require("./userLogin.router");
const registerRouter = require("./usersRregister.router");

indexRouter.use("/" , registerRouter);
indexRouter.use("/" , loginRouter);

module.exports = indexRouter;