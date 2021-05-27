const index = require("express").Router();

index.use("/students/login" , require("./login"));

index.use("/students/signup" , require("./signup"));

module.exports = index;
