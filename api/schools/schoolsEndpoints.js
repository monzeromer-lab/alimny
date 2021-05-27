const express = require("express");
const schoolsMain = express();

schoolsMain.use("/create" , require("./profile/create"));
schoolsMain.use("/update" , require("./profile/update"));

module.exports = schoolsMain;
