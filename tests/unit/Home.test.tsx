import React from "react";
import { render } from '@testing-library/react';
import Home from "../../app/components/Home";
import {BrowserRouter} from "react-router-dom";

test("Home component", () => {
    const unit = <Home />;
    const component = render(unit,{wrapper: BrowserRouter});
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});