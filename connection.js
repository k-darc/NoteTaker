var mysql = require("mysql");

var connection = require("connection");

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345", // add your local password here.
    database: "notetaker_db" // add your db name here
  });
}

connection.config.typeCast = function(field, next) {
  if (field.type == "TINY" && field.length == 1) {
    return field.string() == "1"; 
  }
  return next();
};

module.exports = connection;
