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
    expect(await screen.findByText("ABC Save Results")).toBeTruthy();
    expect(await screen.findByText("ABC Saved!")).toBeTruthy();
  });

  it("Will save an empty situation", async () => {
    render(<ABC />);
    await userEvent.click(document.getElementById("save"));
    expect(sendSpy).not.toHaveBeenCalled();
    expect(await screen.findByText("ABC Save Results")).toBeTruthy();
    expect(
      screen.getByText("At least one Person is required to save."),
    ).toBeTruthy();
    expect(
      screen.getByText("At least one Behavior is required to save."),
    ).toBeTruthy();
    expect(
      screen.getByText("At least one Consequence is required to save."),
    ).toBeTruthy();
    expect(screen.getByText("An Antecedent is required to save.")).toBeTruthy();
    expect(screen.getByText("A Location is required to save.")).toBeTruthy();
    expect(screen.getByText("A Duration is required to save.")).toBeTruthy();
    expect(screen.getByText("An Intensity is required to save.")).toBeTruthy();
    expect(
      screen.getByText("The date and time of the ABC is required to save."),
    ).toBeTruthy();
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
    expect(await screen.findByText("ABC Save Results")).toBeTruthy();
    for (const scope of ["People", "Behavior", "Consequence", "Antecedent"]) {
      expect(
        screen.getByText(
          `For ${scope} - Other, the text description of Other must be entered.`,
        ),
      ).toBeTruthy();
    }
  });
});
