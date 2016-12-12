"use strict";

const until = require("selenium-webdriver").until;

const utils = function (driver) {
    return {
        waitForElementVisible: function (selector) {
            return driver.wait(until.elementLocated(selector));
        },
        getText: function (selector) {
            return driver.findElement(selector).getText();
        },
        getValue: function (selector) {
            return driver.findElement(selector).getAttribute('value');
        },
        setValue: function (selector, value) {
            return driver.findElement(selector).sendKeys(value);
        },
        click: function (selector) {
            return driver.findElement(selector).click();
        },
        emptyCheck: function (text, assert) {
            return assert.equal(text, "");
        }
    };
};

module.exports = utils;
