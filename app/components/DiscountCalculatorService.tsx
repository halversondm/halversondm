/**
 * Created by Daniel on 1/26/2016.
 */
export interface IDiscountCalculatorService {
  isError: () => boolean
  getMessage: () => string[]
  calculate: () => void
  validate: (firstDiscount, secondDiscount, labelPriceVal) => void
}
export default function DiscountCalculatorService (): IDiscountCalculatorService {
  let discount1: number = 0
  let discount2: number = 0
  let labelPrice: number = 0.00
  let error: boolean = false
  let finalPrice: string = '0.00'
  let message: string[] = []

  function isError (): boolean {
    return error
  }

  function getMessage (): string[] {
    return message
  }

  function calculate (): void {
    const firstCalc = labelPrice -
            (labelPrice * (discount1 / 100))
    const newPrice: number = discount2 === 0 ? firstCalc : firstCalc - (firstCalc * (discount2 / 100))
    finalPrice = newPrice.toFixed(2)
    message.push('Your final price is $' + finalPrice + ' plus tax')
  }

  function validate (firstDiscount, secondDiscount, labelPriceVal): void {
    message = []
    error = false
    validateLabelPrice(labelPriceVal)
    validateFirstDiscount(firstDiscount)
    validateSecondDiscount(secondDiscount)
  }

  function validateLabelPrice (labelPriceVal): void {
    if (labelPriceVal.length === 0 || isNaN(labelPriceVal)) {
      message.push('Label price is required and must be a number')
      error = true
    } else {
      labelPrice = labelPriceVal
    }
  }

  function validateFirstDiscount (firstDiscount): void {
    if (firstDiscount.length === 0 || isNaN(firstDiscount)) {
      message.push('Discount #1 is required and must be a number')
      error = true
    } else {
      discount1 = firstDiscount
    }
  }

  function validateSecondDiscount (secondDiscount): void {
    if (isNaN(secondDiscount)) {
      message.push('Discount #2 must be a number, if provided')
      error = true
    } else {
      discount2 = secondDiscount
    }
  }

  return {
    isError,
    getMessage,
    calculate,
    validate
  }
}
