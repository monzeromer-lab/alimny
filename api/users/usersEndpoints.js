const users = require("express").Router();

users.use("/" , require("./admin/index"));
users.use("/" , require("./student/index"));
users.use("/" , require("./teacher/index"));

module.exports = users;