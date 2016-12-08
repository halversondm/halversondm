/**
 * Created by halversondm on 12/2/16.
 */
"use strict";
const webdriver = require("selenium-webdriver");
const test = require("tape");
const By = webdriver.By;
const LOCATION = "https://halversondm.com/base64";
const UNENCODED = "jpmc1234";
const ENCODED = "anBtYzEyMzQ=";

const driver = new webdriver.Builder().forBrowser("chrome").build();
const Utils = require("./utils/driverUtils")(driver);

test("Base 64 Encode data", assert => {
    driver.navigate().to(LOCATION);
    Utils.setValue(By.id("encodeInput"), UNENCODED);
    Utils.click(By.id("encode"));
    const encodeOutput = Utils.getText(By.id("encodeOutput"));
    encodeOutput.then((text) => {
        assert.equal(text, ENCODED);
        assert.end();
    });
});

test("Base 64 Decode data", assert => {
    driver.navigate().to(LOCATION);
    Utils.setValue(By.id("decodeInput"), ENCODED);
    Utils.click(By.id("decode"));
    const decodeOutput = Utils.getText(By.id("decodeOutput"));
    decodeOutput.then((text) => {
        assert.equal(text, UNENCODED);
        assert.end();
    });
});

test.onFinish(() => {
    driver.quit();
});