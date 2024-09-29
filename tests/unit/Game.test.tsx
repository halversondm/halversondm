import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Game from "../../app/components/Game";

describe("Game Test", () => {
    it("Should have a matching snapshot", () => {
        const component = render(<Game />);
        expect(component.container.toString()).toMatchSnapshot();
    });

    it("Play game", async () => {
        const component = render(<Game />);
        await userEvent.click(document.getElementById("rock"));
        await userEvent.click(document.getElementById("paper"));
        await userEvent.click(document.getElementById("scissors"));
        await userEvent.click(document.getElementById("lizard"));
        await userEvent.click(document.getElementById("spock"));
    });
});
