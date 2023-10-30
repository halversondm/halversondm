/**
 * Created by halversondm on 12/15/16.
 */
/**
 * Created by halversondm on 12/6/16.
 */
"use strict";
const assert = require("assert");
const LOCATION = "https://halversondm.com/discountCalculator";

describe("Discount Calculator Test", () => {
  it("Two Discounts", () => {
    browser.url(LOCATION);
    browser.setValue("#labelPrice", "100.23");
    browser.setValue("#discount1", "50");
    browser.setValue("#discount2", "20");
    browser.click("#calculate");

    const finalPrice = browser.getText(".alert-success");
    assert.ok(finalPrice.includes("Your final price is $40.09 plus tax"));
  });

  it("One Discount", () => {
    browser.url(LOCATION);
    browser.setValue("#labelPrice", "100.23");
    browser.setValue("#discount1", "50");
    browser.click("#calculate");

    const finalPrice = browser.getText(".alert-success");
    assert.ok(finalPrice.includes("Your final price is $50.12 plus tax"));
  });

  it("No Discount", () => {
    browser.url(LOCATION);
    browser.setValue("#labelPrice", "100.23");
    browser.click("#calculate");

    const finalPrice = browser.getText(".alert-success");
    assert.equal(finalPrice, "");

    const error = browser.getText(
      "li=Discount #1 is required and must be a number",
    );
    assert.equal(error, "Discount #1 is required and must be a number");
  });

  it("No Data Entered, Calculate", () => {
    browser.url(LOCATION);
    browser.click("#calculate");

    const finalPrice = browser.getText(".alert-success");
    assert.equal(finalPrice, "");

    const error1 = browser.getText(
      "li=Label price is required and must be a number",
    );
    assert.equal(error1, "Label price is required and must be a number");

    const error2 = browser.getText(
      "li=Discount #1 is required and must be a number",
    );
    assert.equal(error2, "Discount #1 is required and must be a number");
  });

  it("Clear Fields", () => {
    browser.url(LOCATION);
    browser.setValue("#labelPrice", "100.23");
    browser.setValue("#discount1", "50");
    browser.setValue("#discount2", "20");

    browser.click("#reset");

    const labelPrice = browser.getText("#labelPrice");
    assert.equal(labelPrice, "");
    const discount1 = browser.getText("#discount1");
    assert.equal(discount1, "");
    const discount2 = browser.getText("#discount2");
    assert.equal(discount2, "");
  });
});
