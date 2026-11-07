import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import UrlBuilder from "../../app/components/UrlBuilder";

test("UrlBuilder component", () => {
  const unit = <UrlBuilder />;
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});

describe("UrlBuilder behavior", () => {
  async function addQuery(key: string, value: string) {
    await userEvent.type(document.getElementById("queryKey"), key);
    await userEvent.type(document.getElementById("queryValue"), value);
    await userEvent.click(document.getElementById("addQuery"));
  }

  it("adds query parameters to the table and clears the inputs", async () => {
    render(<UrlBuilder />);
    await addQuery("a", "1");
    expect(screen.getByText("a")).toBeTruthy();
    expect(screen.getByText("1")).toBeTruthy();
    expect(
      (document.getElementById("queryKey") as HTMLInputElement).value,
    ).toBe("");
    expect(
      (document.getElementById("queryValue") as HTMLInputElement).value,
    ).toBe("");
  });

  it("assembles the URL from the base URL and all parameters", async () => {
    render(<UrlBuilder />);
    await addQuery("a", "1");
    await addQuery("b", "2");
    await userEvent.type(
      document.getElementById("baseUrl"),
      "https://example.com/path",
    );
    await userEvent.click(document.getElementById("assemble"));
    expect(
      (document.getElementById("assembledUrl") as HTMLTextAreaElement).value,
    ).toBe("https://example.com/path?a=1&b=2");
    expect(document.cookie).toContain("baseUrl=https://example.com/path");
    expect(document.cookie).toContain("a=1");
  });

  it("launches the assembled URL in a new window", async () => {
    const write = vi.fn();
    const open = vi
      .spyOn(window, "open")
      .mockReturnValue({ document: { write } } as unknown as Window);
    render(<UrlBuilder />);
    await addQuery("a", "1");
    await userEvent.type(document.getElementById("baseUrl"), "https://x.test/");
    await userEvent.click(document.getElementById("assemble"));
    await userEvent.click(document.getElementById("launch"));
    expect(open).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledTimes(1);
    expect(write.mock.calls[0][0]).toContain('src="https://x.test/?a=1"');
    open.mockRestore();
  });

  it("does nothing when the popup is blocked", async () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<UrlBuilder />);
    await userEvent.click(document.getElementById("launch"));
    expect(open).toHaveBeenCalledTimes(1);
    open.mockRestore();
  });
});
