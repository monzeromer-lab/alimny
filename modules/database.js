const mysql = require('mysql')
const MySqlConnentionKeys = require("../config/keys.json").database
const mySqlConnection = mysql.createConnection(MySqlConnentionKeys)

mySqlConnection.connect(function(error) {
        error ? new Error(error.sqlMessage) : console.log(mySqlConnection.threadId)
});

module.exports = mySqlConnection