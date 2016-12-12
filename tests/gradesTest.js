/**
 * Created by halversondm on 12/7/16.
 */
"use strict";

const webdriver = require("selenium-webdriver");
const test = require("tape");
const By = webdriver.By;
const LOCATION = "http://localhost:3000/grades";

const driver = new webdriver.Builder().forBrowser("chrome")
    .build();
const Utils = require("./utils/driverUtils")(driver);

test("Enter student record", assert => {
    driver.navigate().to(LOCATION);
    Utils.setValue(By.id("studentNumber"), "1");
    Utils.setValue(By.id("quiz1"), "10");
    Utils.setValue(By.id("quiz2"), "9");
    Utils.setValue(By.id("midterm"), "80");
    Utils.setValue(By.id("final"), "70");
    Utils.click(By.id("addStudent"));

    Utils.getText(By.id("studentNumber0")).then(text => {
        assert.equals(text, "1");
    });

    Utils.getText(By.id("quiz10")).then(text => {
        assert.equals(text, "10");
    });

    Utils.getText(By.id("quiz20")).then(text => {
        assert.equals(text, "9");
    });

    Utils.getText(By.id("midterm0")).then(text => {
        assert.equals(text, "80");
    });

    Utils.getText(By.id("final0")).then(text => {
        assert.equals(text, "70");
    });

    Utils.getText(By.id("classAverage0")).then(text => {
        assert.equals(text, "79");
    });

    Utils.getText(By.id("letterGrade0")).then(text => {
        assert.equals(text, "C");
        assert.end();
    });
});

test("Remove student record", assert => {
    driver.navigate().to(LOCATION);
    Utils.setValue(By.id("studentNumber"), "1");
    Utils.setValue(By.id("quiz1"), "10");
    Utils.setValue(By.id("quiz2"), "10");
    Utils.setValue(By.id("final"), "100");
    Utils.setValue(By.id("midterm"), "100");
    Utils.click(By.id("addStudent"));

    Utils.getText(By.id("classAverage0")).then(text => {
        assert.equals(text, "100");
    });

    Utils.click(By.id("removeStudent0"));
    driver.findElements(By.xpath("tbody")).then(elements => {
        assert.equals(elements.length, 0);
        assert.end();
    });
});

test.onFinish(() => {
    driver.quit();
});
