const mysql = require('mysql')
const MySqlConnentionKeys = require("../config/keys.json").database
const mySqlConnection = mysql.createPool(MySqlConnentionKeys)

module.exports = mySqlConnection