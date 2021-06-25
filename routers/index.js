const indexRouter = require("express").Router();

indexRouter.use("/" , require("./usersRregister.router"));
indexRouter.use("/" , require("./userLogin.router"));
indexRouter.use("/" , require("./verify.router"));
indexRouter.use("/" , require("./updateProfile.router"));


module.exports = indexRouter;