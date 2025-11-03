const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

async function accessSecretVersion(
  projectId,
  secretName,
  versionId = "latest",
) {
  const client = new SecretManagerServiceClient();

  const name = `projects/${projectId}/secrets/${secretName}/versions/${versionId}`;

  try {
    const [version] = await client.accessSecretVersion({ name });
    return version.payload.data.toString("utf8");
  } catch (err) {
    console.error("Error accessing secret:", err);
    throw err;
  }
}

export default accessSecretVersion;
