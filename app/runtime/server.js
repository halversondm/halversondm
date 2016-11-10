/*
 Main production server configuration using NodeJS and ExpressJS
 */
"use strict";

console.log("halversondm personal site");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var port = 3000;
var app = express();
var AWS = require("aws-sdk");
var http = require("http");

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

app.post("/stock", (request, response) => {
    var options = {
        hostname: "dev.markitondemand.com",
        port: 80,
        path: "/MODApis/Api/v2/Quote/json?&symbol=" + request.query.stockSymbol,
        method: "GET"
    };
    var proxyRequest = http.request(options, proxyResponse => {
        proxyResponse.setEncoding("utf8");
        proxyResponse.on("data", chunk => {
            response.set("Content-Type", "application/json");
            response.send(chunk);
        });
        proxyResponse.on("end", () => {
            console.log("No more data in response.");
        });
    });

    proxyRequest.on("error", e => {
        console.log(`problem with request: ${e}`);
        response.sendStatus(404);
    });
    proxyRequest.end();
});

app.listen(port);
console.info("==> Listening on port %s.", port);
