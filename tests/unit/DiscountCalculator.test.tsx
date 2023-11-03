import React from "react";
import { render } from '@testing-library/react';
import DiscountCalculator from "../../app/components/DiscountCalculator";

test("Discount Calculator component", () => {
    const unit = <DiscountCalculator />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});