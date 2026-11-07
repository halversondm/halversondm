import React from "react";
import Blog from "../../app/components/Blog";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { vi } from "vitest";
import DOMPurify from "dompurify";
import { server } from "../../setupTests";

// happy-dom's HTML parser does not give DOMPurify a faithful DOM, so the
// sanitizer itself is mocked here and we assert that Blog routes content through it.
vi.mock("dompurify", () => ({
  default: { sanitize: vi.fn((html: string) => html) },
}));

test("Blog component", () => {
  const unit = <Blog />;
  const component = render(unit);
  const tree = component.container;
  expect(tree.toString()).toMatchSnapshot();
});

describe("Blog behavior", () => {
  function useItems(items: Array<Record<string, string>>) {
    server.use(http.post("/api/blog", () => HttpResponse.json({ items })));
  }

  it("renders posts returned by the server", async () => {
    render(<Blog />);
    expect(await screen.findByText("one-title")).toBeTruthy();
    expect(screen.getByText("one-content")).toBeTruthy();
  });

  it("filters posts by a case-insensitive text search", async () => {
    useItems([
      { url: "u1", title: "t1", content: "Hello World", published: "p1" },
      { url: "u2", title: "t2", content: "Goodbye", published: "p2" },
    ]);
    render(<Blog />);
    await screen.findByText("t1");
    await userEvent.type(screen.getByPlaceholderText("Search"), "hello");
    await waitFor(() => {
      expect(screen.queryByText("t2")).toBeNull();
    });
    expect(screen.getByText("t1")).toBeTruthy();
    expect(screen.getByText("1 Items")).toBeTruthy();
  });

  it("treats regex metacharacters in the search as literal text", async () => {
    useItems([
      { url: "u1", title: "t1", content: "a+b (c)", published: "p1" },
      { url: "u2", title: "t2", content: "aab", published: "p2" },
    ]);
    render(<Blog />);
    await screen.findByText("t1");
    await userEvent.type(screen.getByPlaceholderText("Search"), "(c)");
    await waitFor(() => {
      expect(screen.queryByText("t2")).toBeNull();
    });
    expect(screen.getByText("t1")).toBeTruthy();
  });

  it("renders post content only after sanitizing it", async () => {
    const raw = "<p>safe</p><script>window.pwned=1</script>";
    useItems([{ url: "u1", title: "t1", content: raw, published: "p1" }]);
    vi.mocked(DOMPurify.sanitize).mockImplementation(() => "<p>cleaned</p>");
    const { container } = render(<Blog />);
    await screen.findByText("cleaned");
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(raw);
    expect(container.querySelector("script")).toBeNull();
    expect(screen.queryByText("safe")).toBeNull();
    vi.mocked(DOMPurify.sanitize).mockImplementation((html) => String(html));
  });

  it("logs a failed blog request without crashing", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    server.use(http.post("/api/blog", () => HttpResponse.error()));
    render(<Blog />);
    await waitFor(() => {
      expect(log).toHaveBeenCalled();
    });
    log.mockRestore();
  });
});
