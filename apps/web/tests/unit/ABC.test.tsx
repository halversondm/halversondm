import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ABC from "../../app/components/ABC";

describe("ABC App Testing", () => {
  let sendSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    sendSpy = vi.spyOn(XMLHttpRequest.prototype, "send");
  });

  afterEach(() => {
    sendSpy.mockRestore();
  });

  it("Will have a snapshot that matches", () => {
    const component = render(<ABC />);
    expect(component.container.toString()).toMatchSnapshot();
  });

  it("Will save a situation", async () => {
    const component = render(<ABC />);
    await userEvent.click(document.getElementById("now"));
    await userEvent.click(screen.getByLabelText("Asked to wait"));
    await userEvent.click(screen.getByLabelText("Home"));
    await userEvent.click(screen.getByLabelText("Mom"));
    await userEvent.click(screen.getByLabelText("Refuse to follow directions"));
    await userEvent.click(screen.getByLabelText("Verbal Redirection"));
    await userEvent.click(screen.getByLabelText("5 - 10 min"));
    await userEvent.click(screen.getByLabelText("Medium"));
    await userEvent.click(document.getElementById("antecedentOtherRadio"));
    await userEvent.type(
      document.getElementById("antecedentOther"),
      "test antecedent other",
    );
    await userEvent.click(document.getElementById("peopleOtherLabelCheckbox"));
    await userEvent.type(
      document.getElementById("peopleOtherLabelText"),
      "Dog",
    );
    await userEvent.click(
      document.getElementById("behaviorOtherLabelCheckbox"),
    );
    await userEvent.type(
      document.getElementById("behaviorOtherLabelText"),
      "test behavior other",
    );
    await userEvent.click(
      document.getElementById("consequenceOtherLabelCheckbox"),
    );
    await userEvent.type(
      document.getElementById("consequenceOtherLabelText"),
      "test consequence other",
    );
    await userEvent.click(document.getElementById("save"));
    expect(sendSpy).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(String(sendSpy.mock.calls[0][0]));
    expect(payload.people).toContain("Mom");
    expect(payload.location).toBe("Home");
    expect(payload.intensity).toBe("Medium");
    expect(payload.antecedentOther).toBe("test antecedent other");
  });

  it("Will save an empty situation", async () => {
    render(<ABC />);
    await userEvent.click(document.getElementById("save"));
    expect(sendSpy).not.toHaveBeenCalled();
  });

  it("Will save a partially empty situation", async () => {
    render(<ABC />);
    await userEvent.click(document.getElementById("antecedentOtherRadio"));
    await userEvent.click(document.getElementById("peopleOtherLabelCheckbox"));
    await userEvent.click(
      document.getElementById("behaviorOtherLabelCheckbox"),
    );
    await userEvent.click(
      document.getElementById("consequenceOtherLabelCheckbox"),
    );
    await userEvent.click(document.getElementById("save"));
    expect(sendSpy).not.toHaveBeenCalled();
  });
});
