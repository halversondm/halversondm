import React from "react";
import { render } from '@testing-library/react';
import Applications from "../../app/components/Applications";
import {BrowserRouter} from "react-router-dom";

test("Applications component", () => {
    const unit = <Applications />;
    const component = render(unit,{wrapper: BrowserRouter});
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});