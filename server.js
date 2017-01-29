/* eslint no-console: 0 */

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const http = require("http");
const https = require("https");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.post("/saveABC", (req, res) => {

    // Potential fields incoming on the request.
    // {
    //   when: String,
    //       antecedent: String,
    //     antecedentOther: String,
    //     location: String,
    //     people: [String],
    //     peopleOther: String,
    //     behavior: [String],
    //     behaviorOther: String,
    //     duration: String,
    //     intensity: String,
    //     consequence: [String],
    //     consequenceOther: String
    // }

    let abc = req.body;
    Object.keys(abc).forEach(key => {
        if (abc[key] === "") {
            delete abc[key];
        }
    });
    console.log(abc);

    const params = {
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

app.post("/mail.php", (req, res) => {
    console.log(req.body);
    res.send("Email Success!");
});

app.post("/stock", (request, response) => {
    let options = {
        hostname: "dev.markitondemand.com",
        port: 80,
        path: "/MODApis/Api/v2/Quote/json?&symbol=" + request.query.stockSymbol,
        method: "GET",
    };
    let proxyRequest = http.request(options, (proxyResponse) => {
        console.log(`STATUS: ${proxyResponse.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(proxyResponse.headers)}`);
        proxyResponse.setEncoding('utf8');
        proxyResponse.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            response.set("Content-Type", "application/json");
            response.send(chunk);
        });
        proxyResponse.on('end', () => {
            console.log('No more data in response.');
        });
    });
    proxyRequest.on('error', (e) => {
        console.log(`problem with request: ${e}`);
        response.sendStatus(404);
    });
    proxyRequest.end();
});

app.post("/blogService", (request, response) => {
    const options = {
        hostname: "www.googleapis.com",
        port: 443,
        path: "/blogger/v3/blogs/2815390959079070088/posts?key=AIzaSyCO1_3ksPj3HRGRTP0vKPWALbaMqMGuN9I&fields=nextPageToken,items(published,url,title,content)&maxResults=50",
        method: "GET"
    };
    let proxyRequest = https.request(options, (proxyResponse) => {
        let data = "";
        proxyResponse.setEncoding("utf8");
        proxyResponse.on("data", (chunk) => {
            data += chunk;
        });
        proxyResponse.on("end", () => {
            response.set("Content-Type", "application/json");
            response.send(data);
        });
    });
    proxyRequest.on("error", (e) => {
        console.log(`problem with request: ${e}`);
        response.sendStatus(404);
    });
    proxyRequest.end();
});

app.listen(port, "localhost", (err) => {
    if (err) {
        console.log(err);
    }
    console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});
