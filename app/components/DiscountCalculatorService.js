/**
 * Created by Daniel on 1/26/2016.
 */
"use strict";

class DiscountCalculatorService {
    constructor() {
        this.discount1 = 0;
        this.discount2 = 0;
        this.labelPrice = 0.00;
        this.error = false;
        this.finalPrice = 0.00;
        this.message = [];
    }

    isError() {
        return this.error;
    }

    getMessage() {
        return this.message;
    }

    calculate() {
        var firstCalc = this.labelPrice -
            (this.labelPrice * (this.discount1 / 100));
        var newPrice = 0;
        if (this.discount2 === 0) {
            newPrice = firstCalc;
        } else {
            newPrice = firstCalc - (firstCalc * (this.discount2 / 100));
        }
        this.finalPrice = newPrice.toFixed(2);
        this.message.push("Your final price is $" + this.finalPrice + " plus tax");
    }

    validate(firstDiscount, secondDiscount, labelPriceVal) {
        this.message = [];
        this.error = false;
        this.validateLabelPrice(labelPriceVal);
        this.validateFirstDiscount(firstDiscount);
        this.validateSecondDiscount(secondDiscount);
    }

    validateLabelPrice(labelPriceVal) {
        if (labelPriceVal.length === 0 || isNaN(labelPriceVal)) {
            this.message.push("Label price is required and must be a number");
            this.error = true;
        } else {
            this.labelPrice = labelPriceVal;
        }
    }

    validateFirstDiscount(firstDiscount) {
        if (firstDiscount.length === 0 || isNaN(firstDiscount)) {
            this.message.push("Discount #1 is required and must be a number");
            this.error = true;
        } else {
            this.discount1 = firstDiscount;
        }
    }

    validateSecondDiscount(secondDiscount) {
        if (isNaN(secondDiscount)) {
            this.message.push("Discount #2 must be a number, if provided");
            this.error = true;
        } else {
            this.discount2 = secondDiscount;
        }
    }
}

export default DiscountCalculatorService;
