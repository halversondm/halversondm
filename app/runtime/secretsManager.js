import {GetSecretValueCommand, SecretsManagerClient} from "@aws-sdk/client-secrets-manager";

// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html
const client = new SecretsManagerClient({region: process.env.AWS_REGION});

const run = async (secretName) => {
    try {
        let response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
        return response.SecretString;
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
    }

}

export default {run}
