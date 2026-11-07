import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import StockQuote from "../../app/components/StockQuote";

test("StockQuote component", () => {
  const unit = <StockQuote />;
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});

describe("StockQuote behavior", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads quotes for the default symbols", async () => {
    render(<StockQuote />);
    await waitFor(() => {
      expect(screen.getAllByText("MSFT").length).toBeGreaterThan(0);
    });
  });

  it("url-encodes the symbol typed by the user", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<StockQuote />);
    await userEvent.type(document.getElementById("symbol"), "a&b=c");
    await userEvent.click(screen.getByDisplayValue("Go!"));
    await waitFor(() => {
      const urls = fetchSpy.mock.calls.map((call) => String(call[0]));
      expect(urls.some((url) => url.endsWith("stockSymbol=a%26b%3Dc"))).toBe(
        true,
      );
    });
  });

  it("logs and survives a failed service call", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    render(<StockQuote />);
    await waitFor(() => {
      expect(error).toHaveBeenCalled();
    });
    expect(screen.queryByText("MSFT")).toBeNull();
  });
});
