import React from "react";
import { render, screen } from '@testing-library/react';
import DiscountCalculator from "../../app/components/DiscountCalculator";
import userEvent from "@testing-library/user-event";

describe("Discount Calculator", () =>{
    it("Will render the component for a snapshot", () => {
        const component = render(<DiscountCalculator />);
        expect(component.container.toString()).toMatchSnapshot();
    });

    it("Will test a discount with $100, 80% first and 20% second to equal $16", async () => {
        render(<DiscountCalculator />);
        await userEvent.type(document.getElementById("labelPrice"), '100');
        await userEvent.type(document.getElementById("discount1"), '80');
        await userEvent.type(document.getElementById("discount2"), '20');
        await userEvent.click(document.getElementById("calculate"));

        expect(screen.getByText("Your final price is $16.00 plus tax")).not.toBeNull();
    });

    it("Will test a discount with $100, 80% first and 0% second to equal $20", async () => {
        render(<DiscountCalculator />);
        await userEvent.type(document.getElementById("labelPrice"), '100');
        await userEvent.type(document.getElementById("discount1"), '80');
        await userEvent.click(document.getElementById("calculate"));

        expect(screen.getByText("Your final price is $20.00 plus tax")).not.toBeNull();
    });

    it("Will test a discount with $100 and no discounts", async () => {
        render(<DiscountCalculator />);
        await userEvent.type(document.getElementById("labelPrice"), '100');
        await userEvent.click(document.getElementById("calculate"));

        expect(screen.getByText("Discount #1 is required and must be a number")).not.toBeNull();
    });

    it("Will with no input", async () => {
        render(<DiscountCalculator />);
        await userEvent.click(document.getElementById("calculate"));

        expect(screen.getByText("Label price is required and must be a number")).not.toBeNull();
        expect(screen.getByText("Discount #1 is required and must be a number")).not.toBeNull();
    });
})
