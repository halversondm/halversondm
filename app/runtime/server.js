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
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("common"));
app.use(express.static(__dirname));
app.get("*", function response(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/saveABC", function response(req, res) {
    var abc = req.body;
    Object.keys(abc).forEach(key => {
        if (abc[key] === "") {
            delete abc[key];
        }
    });
    console.log(abc);

    var params = {
        TableName: "ABC",
        Item: abc
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(data);
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
