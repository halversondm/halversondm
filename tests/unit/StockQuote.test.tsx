import React from "react";
import { render } from '@testing-library/react';
import StockQuote from "../../app/components/StockQuote";

test("StockQuote component", () => {
    const unit = <StockQuote />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});
