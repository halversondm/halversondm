import { EventEmitter } from "events";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
  put: vi.fn(),
  get: vi.fn(),
  run: vi.fn(),
  request: vi.fn(),
}));

vi.mock("../dyna.js", () => ({
  default: { put: mocks.put, get: mocks.get },
}));
vi.mock("../secretsManager.js", () => ({ default: { run: mocks.run } }));
vi.mock("https", () => ({ default: { request: mocks.request } }));

const PORT = 38457;
const base = `http://127.0.0.1:${PORT}`;

// Builds a fake https.request that replays the given chunks as the upstream response
function fakeUpstream(chunks) {
  mocks.request.mockImplementation((options, callback) => {
    const req = new EventEmitter();
    req.end = () => {
      const res = new EventEmitter();
      res.setEncoding = () => {};
      callback(res);
      chunks.forEach((chunk) => res.emit("data", chunk));
      res.emit("end");
    };
    return req;
  });
}

describe("server", () => {
  let logSpy;
  let secretRequests;

  beforeAll(async () => {
    process.env.PORT = String(PORT);
    process.env.AWS_REGION = "us-east-1";
    process.env.ABC_TABLE = "ABC";
    mocks.run.mockResolvedValue({
      SecretString: JSON.stringify({
        polygonApiKey: "poly-key",
        googleApiKey: "goog-key",
      }),
    });
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    await import("../server.js");
    secretRequests = mocks.run.mock.calls.slice();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    mocks.put.mockReset();
    mocks.get.mockReset();
    mocks.request.mockReset();
    logSpy.mockClear();
  });

  it("loads secrets from Secrets Manager when AWS_REGION is set", () => {
    expect(secretRequests).toEqual([["prod/halversondm"]]);
  });

  it("does not disclose the framework in response headers", async () => {
    mocks.get.mockResolvedValue({ Items: [] });
    const res = await fetch(`${base}/api/abc`);
    expect(res.headers.get("x-powered-by")).toBeNull();
  });

  it("GET /api/abc returns the scanned items", async () => {
    mocks.get.mockResolvedValue({ Items: [{ when: { S: "now" } }] });
    const res = await fetch(`${base}/api/abc`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ Items: [{ when: { S: "now" } }] });
    expect(mocks.get).toHaveBeenCalledWith({ TableName: "ABC" });
  });

  it("GET /api/abc returns 500 when DynamoDB fails", async () => {
    mocks.get.mockRejectedValue(new Error("boom"));
    const res = await fetch(`${base}/api/abc`);
    expect(res.status).toBe(500);
  });

  const abc = {
    when: "now",
    antecedent: "a",
    antecedentOther: "",
    location: "Home",
    people: ["Mom"],
    peopleOther: "",
    behavior: ["b"],
    behaviorOther: "",
    duration: "5",
    intensity: "Medium",
    consequence: ["c"],
    consequenceOther: "",
  };

  async function postJson(path, body) {
    return fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  it("POST /saveABC maps the body to DynamoDB attributes", async () => {
    mocks.put.mockResolvedValue({});
    const res = await postJson("/saveABC", abc);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("ABC Saved!");
    const params = mocks.put.mock.calls[0][0];
    expect(params.TableName).toBe("ABC");
    expect(params.Item.when).toEqual({ S: "now" });
    expect(params.Item.people).toEqual({ SS: ["Mom"] });
    expect(params.Item.consequence).toEqual({ SS: ["c"] });
  });

  it("POST /saveABC returns 500 when DynamoDB fails", async () => {
    mocks.put.mockRejectedValue(new Error("boom"));
    const res = await postJson("/saveABC", abc);
    expect(res.status).toBe(500);
  });

  it("POST /mail.php acknowledges without logging the request body", async () => {
    const res = await postJson("/mail.php", { message: "secret\nforged line" });
    expect(await res.text()).toBe("Email Success!");
    expect(JSON.stringify(logSpy.mock.calls)).not.toContain("secret");
  });

  it("unknown GET routes fall back to index.html", async () => {
    const res = await fetch(`${base}/some/client/route`);
    // public/index.html does not exist in the test environment
    expect(res.status).toBe(404);
  });

  it("POST /api/stock encodes the symbol and sends the key in a header", async () => {
    fakeUpstream([
      JSON.stringify({
        ticker: "IBM",
        results: [{ c: 1, t: 2, h: 3, o: 4, l: 5 }],
      }),
    ]);
    const res = await fetch(
      `${base}/api/stock?stockSymbol=${encodeURIComponent("../x?y")}`,
      {
        method: "POST",
      },
    );
    expect(await res.json()).toEqual({
      Symbol: "IBM",
      Name: "",
      MarketCap: "",
      ChangeYTD: "",
      LastPrice: 1,
      Timestamp: 2,
      High: 3,
      Open: 4,
      Low: 5,
    });
    const options = mocks.request.mock.calls[0][0];
    expect(options.hostname).toBe("api.polygon.io");
    expect(options.path).toBe(
      "/v2/aggs/ticker/" + encodeURIComponent("../x?y") + "/prev?adjusted=true",
    );
    expect(options.path).not.toContain("poly-key");
    expect(options.headers.Authorization).toBe("Bearer poly-key");
  });

  it("POST /api/stock omits prices when there are no results", async () => {
    fakeUpstream([JSON.stringify({ ticker: "NONE" })]);
    const res = await fetch(`${base}/api/stock?stockSymbol=NONE`, {
      method: "POST",
    });
    const body = await res.json();
    expect(body.Symbol).toBe("NONE");
    expect(body.LastPrice).toBeUndefined();
  });

  it("POST /api/stock returns an empty object when upstream sends null", async () => {
    fakeUpstream(["null"]);
    const res = await fetch(`${base}/api/stock?stockSymbol=X`, {
      method: "POST",
    });
    expect(await res.json()).toEqual({});
  });

  it("POST /api/stock returns 404 when the upstream request errors", async () => {
    mocks.request.mockImplementation(() => {
      const req = new EventEmitter();
      req.end = () => req.emit("error", new Error("down"));
      return req;
    });
    const res = await fetch(`${base}/api/stock?stockSymbol=X`, {
      method: "POST",
    });
    expect(res.status).toBe(404);
  });

  it("POST /api/blog concatenates chunks and sends the key in a header", async () => {
    fakeUpstream(['{"items":', "[]}"]);
    const res = await fetch(`${base}/api/blog`, { method: "POST" });
    expect(await res.json()).toEqual({ items: [] });
    const options = mocks.request.mock.calls[0][0];
    expect(options.hostname).toBe("www.googleapis.com");
    expect(options.path).not.toContain("goog-key");
    expect(options.headers["x-goog-api-key"]).toBe("goog-key");
  });

  it("POST /api/blog returns 404 when the upstream request errors", async () => {
    mocks.request.mockImplementation(() => {
      const req = new EventEmitter();
      req.end = () => req.emit("error", new Error("down"));
      return req;
    });
    const res = await fetch(`${base}/api/blog`, { method: "POST" });
    expect(res.status).toBe(404);
  });
});
