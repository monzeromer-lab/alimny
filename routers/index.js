const indexRouter = require("express").Router();
const registerRouter = require("./usersRregister.router");

indexRouter.use("/" , registerRouter);

module.exports = indexRouter;