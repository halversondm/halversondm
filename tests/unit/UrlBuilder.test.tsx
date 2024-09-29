import React from "react";
import { render } from '@testing-library/react';
import UrlBuilder from "../../app/components/UrlBuilder";

test("UrlBuilder component", () => {
    const unit = <UrlBuilder />;
    const component = render(unit);
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});