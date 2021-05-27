const indexRouter = require("express").Router();

indexRouter.use("/api/users" , require("./users/usersEndpoints"));
indexRouter.use("/api/schools" , require("./schools/schoolsEndpoints"));

module.exports = indexRouter;