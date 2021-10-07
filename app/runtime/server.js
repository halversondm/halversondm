/*
 Main server configuration using NodeJS and ExpressJS
 */

import path from "path";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import https from "https";
import dyna from "./dyna.js";

console.log("halversondm personal site");

const __dirname = path.resolve();
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("common"));
app.use(express.static(__dirname));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/saveABC", async (req, res) => {

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

    const abc = req.body;

    const params = {
        TableName: process.env.ABC_TABLE,
        Item: {
            when: {S: abc.when},
            antecedent: {S: abc.antecedent},
            antecedentOther: {S: abc.antecedentOther},
            location: {S: abc.location},
            people: {SS: abc.people},
            peopleOther: {S: abc.peopleOther},
            behavior: {SS: abc.behavior},
            behaviorOther: {S: abc.behaviorOther},
            duration: {S: abc.duration},
            intensity: {S: abc.intensity},
            consequence: {SS: abc.consequence},
            consequenceOther: {S: abc.consequenceOther}
        }
    };

    try {
        console.log(params);
        const result = await dyna.run(params);
        res.status(200).send('ABC Saved!');
    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify(error));
    }
});

app.post("/mail.php", (req, res) => {
    console.log(req.body);
    res.send("Email Success!");
});

app.post("/stock", (request, response) => {
    const options = {
        hostname: "dev.markitondemand.com",
        port: 80,
        path: "/MODApis/Api/v2/Quote/json?&symbol=" + request.query.stockSymbol,
        method: "GET",
    };
    const proxyRequest = http.request(options, (proxyResponse) => {
        proxyResponse.setEncoding("utf8");
        proxyResponse.on("data", (chunk) => {
            response.set("Content-Type", "application/json");
            response.send(chunk);
        });
        proxyResponse.on("end", () => {
            console.log("No more data in response.");
        });
    });
    proxyRequest.on("error", (e) => {
        console.log(`problem with request: ${e}`);
        response.sendStatus(404);
    });
    proxyRequest.end();
});

app.post("/blogService", (request, response) => {
    const options = {
        hostname: "www.googleapis.com",
        port: 443,
        path: "/blogger/v3/blogs/2815390959079070088/posts?key=AIzaSyDiuZzPpXkejEWKjtACQ3QmxIwKBWDHgUM&fields=nextPageToken,items(published,url,title,content)&maxResults=50",
        method: "GET",
    };
    const proxyRequest = https.request(options, (proxyResponse) => {
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

app.listen(port, "0.0.0.0", (err) => {
    if (err) {
        console.log(err);
    }
    console.info("==> Listening on port %s.", port);
});
