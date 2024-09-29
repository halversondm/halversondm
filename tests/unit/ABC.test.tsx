import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import ABC from "../../app/components/ABC";

describe("ABC App Testing", () => {
    it("Will have a snapshot that matches", () => {
        const component = render(<ABC/>);
        expect(component.container.toString()).toMatchSnapshot();
    });

    it("Will save a situation", async () => {
        const component = render(<ABC/>);
        await userEvent.click(document.getElementById("now"));
        await userEvent.click(screen.getByLabelText("Asked to wait"));
        await userEvent.click(screen.getByLabelText("Home"));
        await userEvent.click(screen.getByLabelText("Mom"));
        await userEvent.click(screen.getByLabelText("Refuse to follow directions"));
        await userEvent.click(screen.getByLabelText("Verbal Redirection"));
        await userEvent.click(screen.getByLabelText("5 - 10 min"));
        await userEvent.click(screen.getByLabelText("Medium"));
        await userEvent.click(document.getElementById("antecedentOtherRadio"));
        await userEvent.type(document.getElementById("antecedentOther"),"test antecedent other");
        await userEvent.click(document.getElementById("peopleOtherLabelCheckbox"));
        await userEvent.type(document.getElementById("peopleOtherLabelText"), "Dog");
        await userEvent.click(document.getElementById("behaviorOtherLabelCheckbox"));
        await userEvent.type(document.getElementById("behaviorOtherLabelText"), "test behavior other");
        await userEvent.click(document.getElementById("consequenceOtherLabelCheckbox"));
        await userEvent.type(document.getElementById("consequenceOtherLabelText"), "test consequence other");
        await userEvent.click(document.getElementById("save"));
    });

    it("Will save an empty situation", async () => {
        const component = render(<ABC/>);
        await userEvent.click(document.getElementById("save"));
    });
    it("Will save a partially empty situation", async () => {
        const component = render(<ABC/>);
        await userEvent.click(document.getElementById("antecedentOtherRadio"));
        await userEvent.click(document.getElementById("peopleOtherLabelCheckbox"));
        await userEvent.click(document.getElementById("behaviorOtherLabelCheckbox"));
        await userEvent.click(document.getElementById("consequenceOtherLabelCheckbox"));
        await userEvent.click(document.getElementById("save"));
    });
});
