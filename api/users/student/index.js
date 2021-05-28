const index = require("express").Router();

index.use("/students/login" , require("./login"));

index.use("/students/signup" , require("./signup"));

index.use("/students/update" , require("./update"));

module.exports = index;
