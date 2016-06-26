/*
Main production server configuration using NodeJS and ExpressJS
 */
"use strict";
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var port = 80;
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/abc");
// eslint-disable-next-line
var abcSchema = mongoose.Schema({
  when: String,
  antecedent: String,
  antecedentOther: String,
  location: String,
  people: [String],
  peopleOther: String,
  behavior: [String],
  behaviorOther: String,
  duration: String,
  intensity: String,
  consequence: [String],
  consequenceOther: String
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("common"));
app.use(express.static(__dirname));
app.get("*", function response(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/saveABC", function response(req, res) {
  console.log(req.body);
  var ABC = mongoose.model("ABC", abcSchema);
  var abcInstance = new ABC(req.body);
  abcInstance.save(function(err) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("ABC Saved!");
    }
  });
});
app.post("/mail.php", function response(req, res) {
  console.log(req.body);
  res.send("Email Success!");
});

app.listen(port);
console.info("==> Listening on port %s.", port);
