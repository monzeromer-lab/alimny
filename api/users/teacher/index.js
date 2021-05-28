const index = require("express").Router();

index.use("/teachers/login" , require("./login"));

index.use("/teachers/signup" , require("./signup"));

index.use("/teachers/update" , require("./update"));

module.exports = index;