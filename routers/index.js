const indexRouter = require("express").Router();

indexRouter.use("/" , require("./usersRregister.router"));
indexRouter.use("/" , require("./userLogin.router"));
indexRouter.use("/" , require("./verify.router"));


module.exports = indexRouter;