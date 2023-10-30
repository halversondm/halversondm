/**
 * Created by halversondm on 12/7/16.
 */
"use strict";

const assert = require("assert");
const LOCATION = "https://halversondm.com/grades";

describe("Grade Book Testing", () => {
  beforeEach(() => {
    browser.url(LOCATION);
  });

  it("Enter student record", () => {
    browser.setValue("#studentNumber", "1");
    browser.setValue("#quiz1", "10");
    browser.setValue("#quiz2", "9");
    browser.setValue("#midterm", "80");
    browser.setValue("#final", "70");
    browser.click("#addStudent");

    const studentNumber0 = browser.getText("#studentNumber0");
    assert.equal(studentNumber0, "1");

    const quiz10 = browser.getText("#quiz10");
    assert.equal(quiz10, "10");

    const quiz20 = browser.getText("#quiz20");
    assert.equal(quiz20, "9");

    const midterm0 = browser.getText("#midterm0");
    assert.equal(midterm0, "80");

    const final0 = browser.getText("#final0");
    assert.equal(final0, "70");

    const classAverage0 = browser.getText("#classAverage0");
    assert.equal(classAverage0, "79");

    const letterGrade0 = browser.getText("#letterGrade0");
    assert.equal(letterGrade0, "C");
  });

  it("Remove student record", () => {
    browser.setValue("#studentNumber", "1");
    browser.setValue("#quiz1", "10");
    browser.setValue("#quiz2", "10");
    browser.setValue("#final", "100");
    browser.setValue("#midterm", "100");
    browser.click("#addStudent");
    const classAverage0 = browser.getText("#classAverage0");
    assert.equal(classAverage0, "100");

    browser.click("#removeStudent0");

    const studentNumber0 = browser.isExisting("#studentNumber0");
    assert.equal(studentNumber0, false);
  });
});
