/**
 * Created by halversondm on 8/7/16.
 */
"use strict";

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "ABC",
  KeySchema: [{ AttributeName: "when", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "when", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2),
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2),
    );
  }
});
