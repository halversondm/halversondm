import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.hoisted(() => vi.fn());

vi.mock("@aws-sdk/client-secrets-manager", () => ({
  SecretsManagerClient: class {
    send = send;
  },
  GetSecretValueCommand: class {
    constructor(input) {
      this.input = input;
    }
  },
}));

import secretsManager from "../secretsManager.js";

describe("secretsManager", () => {
  beforeEach(() => {
    send.mockReset();
  });

  it("requests the AWSCURRENT version of the named secret", async () => {
    send.mockResolvedValue({ SecretString: "{}" });
    const result = await secretsManager.run("prod/halversondm");
    expect(result).toEqual({ SecretString: "{}" });
    expect(send.mock.calls[0][0].input).toEqual({
      SecretId: "prod/halversondm",
      VersionStage: "AWSCURRENT",
    });
  });

  it("propagates errors from the client", async () => {
    send.mockRejectedValue(new Error("not found"));
    let message;
    try {
      await secretsManager.run("x");
    } catch (error) {
      message = error.message;
    }
    expect(message).toBe("not found");
  });
});
