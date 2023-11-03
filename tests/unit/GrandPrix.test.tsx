import React from "react";
import { render } from '@testing-library/react';
import GrandPrix from "../../app/components/GrandPrix";

test("GrandPrix component", () => {
    const unit = <GrandPrix />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});