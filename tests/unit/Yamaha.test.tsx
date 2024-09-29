import React from "react";
import { render } from '@testing-library/react';
import Yamaha from "../../app/components/Yamaha";

test("Yamaha component", () => {
    const unit = <Yamaha />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});