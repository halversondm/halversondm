import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Base64 from "../../app/components/Base64";

describe("Base64", () => {
    it("Will produce a snapshot of the Base64 component", () => {
        const component = render(<Base64 />);
        expect(component.container.toString()).toMatchSnapshot();
    });

    it("Will test the Base64 component encode functionality", async() => {
        render(<Base64 />);
        await userEvent.type(document.getElementById("encodeInput"), 'jpmc1234');
        await userEvent.click(document.getElementById("encode"));
        expect(document.getElementById("encodeOutput").value).toEqual('anBtYzEyMzQ=');
    });

    it("Will test the Base64 component decode functionality", async() => {
        render(<Base64 />);
        await userEvent.type(document.getElementById("decodeInput"), 'anBtYzEyMzQ=');
        await userEvent.click(document.getElementById("decode"));
        expect(document.getElementById("decodeOutput").value).toEqual('jpmc1234');
    });
})

