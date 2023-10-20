import {GetSecretValueCommand, SecretsManagerClient} from "@aws-sdk/client-secrets-manager";

// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html
const client = new SecretsManagerClient({region: process.env.AWS_REGION});

const run = async (secretName) => {
    let response;
    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
    }
    return response;
}

export default {run}
