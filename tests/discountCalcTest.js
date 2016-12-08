/**
 * Created by halversondm on 12/6/16.
 */
"use strict";

const webdriver = require("selenium-webdriver");
const test = require("tape");
const By = webdriver.By;
const LOCATION = "https://halversondm.com/discountCalculator";

const driver = new webdriver.Builder().forBrowser("chrome").build();
const Utils = require("./utils/driverUtils")(driver);

test("Two Discounts", assert => {
    driver.navigate().to(LOCATION);
    Utils.setValue(By.id("labelPrice"), "100.23");
    Utils.setValue(By.id("discount1"), "50");
    Utils.setValue(By.id("discount2"), "20");
    Utils.click(By.id("calculate"));

    const finalPrice = Utils.getText(By.css(".alert-success"));
    finalPrice.then((text) => {
        assert.ok(text.includes("Your final price is $40.09 plus tax"));
        assert.end();
    });
});


test("One Discount", assert => {
    driver.navigate().to(LOCATION);
    Utils.setValue(By.id("labelPrice"), "100.23");
    Utils.setValue(By.id("discount1"), "50");
    Utils.click(By.id("calculate"));

    const finalPrice = Utils.getText(By.css(".alert-success"));
    finalPrice.then((text) => {
        assert.ok(text.includes("Your final price is $50.12 plus tax"));
        assert.end();
    });
});

test("No Discount", assert => {
    driver.navigate().to(LOCATION);
    Utils.setValue(By.id("labelPrice"), "100.23");
    Utils.click(By.id("calculate"));

    const finalPrice = Utils.getText(By.css(".alert-success"));
    finalPrice.then((text) => {
        emptyCheck(text, assert);
    });

    const error = driver.findElement(By.css(".alert-danger")).findElement(By.xpath("ul/li")).getText();
    error.then((text) => {
        assert.equals(text, "Discount #1 is required and must be a number");
        assert.end();
    });
});

test("No Data Entered, Calculate", assert => {
    driver.navigate().to(LOCATION);
    Utils.click(By.id("calculate"));

    const finalPrice = Utils.getText(By.css(".alert-success"));
    finalPrice.then((text) => {
        emptyCheck(text, assert);
    });

    driver.findElement(By.css(".alert-danger")).findElement(By.xpath("ul")).findElements(By.xpath("li")).then((elements) => {
        elements[0].getText().then(text => {
            assert.equals(text, "Label price is required and must be a number");
        });
        elements[1].getText().then(text => {
            assert.equals(text, "Discount #1 is required and must be a number");
            assert.end();
        });
    });
});

test("Clear Fields", assert => {
    driver.navigate().to(LOCATION);
    Utils.setValue(By.id("labelPrice"), "100.23");
    Utils.setValue(By.id("discount1"), "50");
    Utils.setValue(By.id("discount2"), "20");

    Utils.click(By.id("reset"));

    Utils.getText(By.id("labelPrice")).then(text => {
        emptyCheck(text, assert);
    });
    Utils.getText(By.id("discount1")).then(text => {
        emptyCheck(text, assert);
    });
    Utils.getText(By.id("discount2")).then(text => {
        emptyCheck(text, assert);
        assert.end();
    });
});

function emptyCheck(text, assert) {
    return assert.equals(text, "");
}

test.onFinish(() => {
    driver.quit();
});
