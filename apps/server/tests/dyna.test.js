import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.hoisted(() => vi.fn());

vi.mock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: class {
    send = send;
  },
  PutItemCommand: class {
    constructor(input) {
      this.type = "put";
      this.input = input;
    }
  },
  ScanCommand: class {
    constructor(input) {
      this.type = "scan";
      this.input = input;
    }
  },
}));

import dyna from "../dyna.js";

describe("dyna", () => {
  beforeEach(() => {
    send.mockReset();
  });

  it("put sends a PutItemCommand and returns the result", async () => {
    send.mockResolvedValue({ ok: true });
    const result = await dyna.put({ TableName: "ABC" });
    expect(result).toEqual({ ok: true });
    expect(send.mock.calls[0][0]).toMatchObject({
      type: "put",
      input: { TableName: "ABC" },
    });
  });

  it("get sends a ScanCommand and returns the result", async () => {
    send.mockResolvedValue({ Items: [] });
    const result = await dyna.get({ TableName: "ABC" });
    expect(result).toEqual({ Items: [] });
    expect(send.mock.calls[0][0].type).toBe("scan");
  });

  it("put and get rethrow client failures", async () => {
    send.mockRejectedValue(new Error("denied"));
    const messages = [];
    for (const call of [dyna.put, dyna.get]) {
      try {
        await call({});
      } catch (error) {
        messages.push(error.message);
      }
    }
    expect(messages).toHaveLength(2);
    messages.forEach((message) => expect(message).toContain("denied"));
  });
});
