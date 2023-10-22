/**
 * Created by Daniel on 1/26/2016.
 */
export class DiscountCalculatorService {
    discount1
    discount2
    labelPrice
    error: boolean
    finalPrice
    message: string[]

    constructor() {
        this.discount1 = 0
        this.discount2 = 0
        this.labelPrice = 0.00
        this.error = false
        this.finalPrice = 0.00
        this.message = []
    }

    public isError(): boolean {
        return this.error
    }

    public getMessage(): string[] {
        return this.message
    }

    public calculate(): void {
        const firstCalc = this.labelPrice -
            (this.labelPrice * (this.discount1 / 100))
        const newPrice = this.discount2 === 0 ? firstCalc : firstCalc - (firstCalc * (this.discount2 / 100))
        this.finalPrice = newPrice.toFixed(2)
        this.message.push('Your final price is $' + this.finalPrice + ' plus tax')
    }

    public validate(firstDiscount, secondDiscount, labelPriceVal): void {
        this.message = []
        this.error = false
        this.validateLabelPrice(labelPriceVal)
        this.validateFirstDiscount(firstDiscount)
        this.validateSecondDiscount(secondDiscount)
    }

    private validateLabelPrice(labelPriceVal): void {
        if (labelPriceVal.length === 0 || isNaN(labelPriceVal)) {
            this.message.push('Label price is required and must be a number')
            this.error = true
        } else {
            this.labelPrice = labelPriceVal
        }
    }

    private validateFirstDiscount(firstDiscount): void {
        if (firstDiscount.length === 0 || isNaN(firstDiscount)) {
            this.message.push('Discount #1 is required and must be a number')
            this.error = true
        } else {
            this.discount1 = firstDiscount
        }
    }

    private validateSecondDiscount(secondDiscount): void {
        if (isNaN(secondDiscount)) {
            this.message.push('Discount #2 must be a number, if provided')
            this.error = true
        } else {
            this.discount2 = secondDiscount
        }
    }
}
