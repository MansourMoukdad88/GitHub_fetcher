var express = require("express");
var bodyParser = require("body-parser");
var repos = require("../database");
var cors = require("cors");

let app = express();
app.use(cors());

app.use(express.static(__dirname + "/../client/dist"));

app.post("/repos", function(req, res) {
  console.log("Post request from server", bodyParser);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get("/repos", function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  repos.selectAll(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log("GET request from server", data);
      res.json(data);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
