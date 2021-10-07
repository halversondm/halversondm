import {DynamoDBClient, PutItemCommand} from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({region: process.env.AWS_REGION});

const run = async (params) => {
    try {
        const data = await ddbClient.send(new PutItemCommand(params));
        return data;
    } catch (err) {
        throw Error(err);
    }
};

export default {run}