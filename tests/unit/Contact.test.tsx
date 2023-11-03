import React from "react";
import { render } from '@testing-library/react';
import Contact from "../../app/components/Contact";

test("Contact component", () => {
    const unit = <Contact/>;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});