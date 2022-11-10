const mysql = require("mysql2");
const util = require("util");

// MySQL database connection

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "huxdotter",
  database: "company_db",
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
  if (err) {
    throw err;
  }
});

module.exports = connection;
