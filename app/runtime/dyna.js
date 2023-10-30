import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

const put = async (params) => {
  try {
    const data = await client.send(new PutItemCommand(params));
    return data;
  } catch (err) {
    throw Error(err);
  }
};

const get = async (params) => {
  try {
    const data = await client.send(new ScanCommand(params));
    return data;
  } catch (err) {
    throw Error(err);
  }
};

export default { put, get };
