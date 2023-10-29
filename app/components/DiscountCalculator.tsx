/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import DiscountCalculatorService from './DiscountCalculatorService'
import { type ReactNode, useState } from 'react'

export interface DiscountCalculatorState {
  labelPrice: string
  discount1: string
  discount2: string
  errorMessage: string[]
  successMessage: string
}

export default function DiscountCalculator (): ReactNode {
  const discountCalculatorService = DiscountCalculatorService()
  const [state, setState] = useState<DiscountCalculatorState>(initialState())

  function calculate (): void {
    discountCalculatorService.validate(state.discount1, state.discount2, state.labelPrice)
    if (discountCalculatorService.isError()) {
      setState({
        ...state,
        errorMessage: discountCalculatorService.getMessage(),
        successMessage: ''
      })
    } else {
      discountCalculatorService.calculate()
      setState({
        ...state,
        successMessage: discountCalculatorService.getMessage()[0],
        errorMessage: []
      })
    }
  }

  function clear (): void {
    setState(initialState())
  }

  function labelPriceChange (event): void {
    setState({ ...state, labelPrice: event.target.value })
  }

  function discount1Change (event): void {
    setState({ ...state, discount1: event.target.value })
  }

  function discount2Change (event): void {
    setState({ ...state, discount2: event.target.value })
  }

  function initialState (): DiscountCalculatorState {
    return {
      labelPrice: '',
      discount1: '',
      discount2: '',
      errorMessage: [],
      successMessage: ''
    }
  }

  return (
        <div>
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
                                       onChange={labelPriceChange}
                                       value={state.labelPrice}/>
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
                                       onChange={discount1Change}
                                       value={state.discount1}/> <span
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
                                       onChange={discount2Change}
                                       value={state.discount2}/> <span
                                className="input-group-addon">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" id="calculate"
                                    className="btn btn-primary"
                                    onClick={calculate}>Calculate
                            </button>
                            <button type="button" id="reset"
                                    className="btn btn-danger"
                                    onClick={clear}>Reset
                            </button>
                        </div>
                    </div>
                    <div className="alert alert-danger alert-dismissible" role="alert"
                         hidden={state.errorMessage.length === 0}>
                        <button type="button" className="close" data-dismiss="alert"><span
                            aria-hidden="true">&times;</span></button>
                        <strong>Error! </strong>
                        <ul>
                            {
                                state.errorMessage.map((message, i) => {
                                  return <li key={i}>{message}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="alert alert-success alert-dismissible" role="alert"
                         hidden={state.successMessage === ''}>
                        <button type="button" className="close" data-dismiss="alert"><span
                            aria-hidden="true">&times;</span></button>
                        {state.successMessage}
                    </div>
                </form>
            </fieldset>

        </div>
  )
}
