var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mansour"
});

connection.connect(err => {
  if (err) {
    return err;
  }
});

//console.log("FROM database .... : ", connection)

var selectAll = function(callback) {
  connection.query("SELECT * FROM repos", function(err, results, fields) {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      console.log("Query From database", results);
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
