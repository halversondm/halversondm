/**
 * Created by halversondm on 12/15/16.
 */

"use strict";
const assert = require("assert");
const LOCATION = "https://halversondm.com/base64";
const UNENCODED = "jpmc1234";
const ENCODED = "anBtYzEyMzQ=";

describe("Base 64 Encode and Decode test", () => {
    it("Encodes Data", () => {
        browser.url(LOCATION);
        browser.setValue("#encodeInput", UNENCODED);
        browser.click("#encode");
        const encodeOutput = browser.getText("#encodeOutput");
        assert.equal(encodeOutput, ENCODED);
    });

    it("Decodes data", () => {
        browser.url(LOCATION);
        browser.setValue("#decodeInput", ENCODED);
        browser.click("#decode");
        const decodeOutput = browser.getText("#decodeOutput");
        assert.equal(decodeOutput, UNENCODED);
    });
});


