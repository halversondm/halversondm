import React from "react";
import { render } from '@testing-library/react';
import Auto from "../../app/components/Auto";
import {BrowserRouter, MemoryRouter} from 'react-router-dom'


test("Auto component", () => {
    const component = render(<Auto />, {wrapper: BrowserRouter});
    const tree = component.container;
    expect(tree.toString()).toMatchSnapshot();
});