import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { beforeAll, afterAll, afterEach } from "vitest";

const server = setupServer(
  http.post("/api/stock*", () => {
    return HttpResponse.json({
      Symbol: "MSFT",
      Name: "string2",
      LastPrice: "string3",
      Timestamp: "string4",
      MarketCap: "string5",
      ChangeYTD: "string6",
      High: "string7",
      Open: "string8",
      Low: "string9",
    });
  }),
  http.post("/api/blog", () => {
    return HttpResponse.json({
      items: [
        {
          url: "one-url",
          title: "one-title",
          content: "one-content",
          published: new Date(),
        },
      ],
    });
  }),
  http.get("http://platform.linkedin.com/badges/js/profile.js", () => {
    return HttpResponse.text("function test() {}");
  }),
  http.get("http://platform.twitter.com/widgets.js", () => {
    return HttpResponse.text("function test() {}");
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
