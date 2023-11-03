import DiscountCalculatorService from "../../app/components/DiscountCalculatorService";

test("DiscountCalculatorService validate 1", () => {
    const discountCalculatorService = DiscountCalculatorService();
    discountCalculatorService.validate(0, 0, 0);
    expect(discountCalculatorService.isError()).toEqual(false);
    expect(discountCalculatorService.getMessage().length).toEqual(0);
});