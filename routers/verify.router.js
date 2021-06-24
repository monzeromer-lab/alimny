const express = require("express");
const users = require("../modules/user");
const verifyRouter = express();

verifyRouter.use(express.json());
verifyRouter.use(express.urlencoded({extended : true}));

verifyRouter.get("")

module.exports = verifyRouter;