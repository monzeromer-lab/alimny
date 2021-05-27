const index = require("express").Router();

index.use("/admin/login" , require("./login"));

index.use("/admin/signup" , require("./signup"));

index.use("/admin/update" , require("./update"));

module.exports = index;