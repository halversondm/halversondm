/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import * as React from "react";
import DiscountCalculatorService from "./DiscountCalculatorService";

interface DiscountCalculatorState {
    labelPrice: string,
    discount1: string,
    discount2: string,
    errorMessage: string[],
    successMessage: string
}

export default class DiscountCalculator extends React.Component<undefined,DiscountCalculatorState> {

    discountCalculatorService: DiscountCalculatorService;
    state: DiscountCalculatorState;

    constructor() {
        super();
        this.state = this.initialState();
        this.discountCalculatorService = new DiscountCalculatorService();
        this.calculate = this.calculate.bind(this);
        this.clear = this.clear.bind(this);
        this.labelPriceChange = this.labelPriceChange.bind(this);
        this.discount1Change = this.discount1Change.bind(this);
        this.discount2Change = this.discount2Change.bind(this);
    }

    private initialState() {
        return {
            labelPrice: "",
            discount1: "",
            discount2: "",
            errorMessage: [],
            successMessage: ""
        };
    }

    calculate() {
        this.discountCalculatorService.validate(this.state.discount1, this.state.discount2, this.state.labelPrice);
        if (this.discountCalculatorService.isError()) {
            this.setState({
                errorMessage: this.discountCalculatorService.getMessage(),
                successMessage: ""
            });
        } else {
            this.discountCalculatorService.calculate();
            this.setState({
                successMessage: this.discountCalculatorService.getMessage()[0],
                errorMessage: []
            });
        }
    }

    clear() {
        this.setState(this.initialState());
    }

    labelPriceChange(event: any) {
        this.setState({labelPrice: event.target.value});
    }

    discount1Change(event: any) {
        this.setState({discount1: event.target.value});
    }

    discount2Change(event: any) {
        this.setState({discount2: event.target.value});
    }

    render() {
        return <div>
            <h2 className="text-primary">Discount Calculator</h2>
            <p>Calculate your final price where the retailer is offering separate
                discounts.</p>
            <fieldset>
                <form className="form-horizontal" role="form">
                    <div className="form-group">
                        <label htmlFor="labelPrice" className="col-sm-2 control-label">Label
                            Price
                        </label>
                        <div className="col-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon">$</span>
                                <input type="number" className="form-control" id="labelPrice"
                                       onChange={this.labelPriceChange}
                                       value={this.state.labelPrice}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="discount1" className="col-sm-2 control-label">Discount
                            #1
                        </label>
                        <div className="col-sm-10">
                            <div className="input-group">
                                <input type="number" className="form-control" id="discount1"
                                       onChange={this.discount1Change}
                                       value={this.state.discount1}/> <span
                                className="input-group-addon">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="discount2" className="col-sm-2 control-label">Discount
                            #2
                        </label>
                        <div className="col-sm-10">
                            <div className="input-group">
                                <input type="number" className="form-control" id="discount2"
                                       onChange={this.discount2Change}
                                       value={this.state.discount2}/> <span
                                className="input-group-addon">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" id="calculate"
                                    className="btn btn-primary"
                                    onClick={this.calculate}>Calculate
                            </button>
                            <button type="button" id="reset"
                                    className="btn btn-danger"
                                    onClick={this.clear}>Reset
                            </button>
                        </div>
                    </div>
                    <div className="alert alert-danger alert-dismissible" role="alert"
                         hidden={this.state.errorMessage.length === 0}>
                        <button type="button" className="close" data-dismiss="alert"><span
                            aria-hidden="true">&times;</span></button>
                        <strong>Error! </strong>
                        <ul>
                            {
                                this.state.errorMessage.map((message, i) => {
                                    return <li key={i}>{message}</li>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="alert alert-success alert-dismissible" role="alert"
                         hidden={this.state.successMessage === ""}>
                        <button type="button" className="close" data-dismiss="alert"><span
                            aria-hidden="true">&times;</span></button>
                        {this.state.successMessage}
                    </div>
                </form>
            </fieldset>

        </div>;
    }
}
