/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import {type ReactNode} from 'react'

export interface StockQuoteState {
    stockInput: string
    stocks: Stock[]
}

export interface Stock {
    Symbol: string
    Name: string
    LastPrice?: string
    Timestamp?: string
    MarketCap?: string
    ChangeYTD?: string
    High?: string
    Open?: string
    Low?: string
}

export class StockQuote extends React.Component<unknown, StockQuoteState> {
    state: StockQuoteState

    constructor(props) {
        super(props)
        this.state = {
            stockInput: '',
            stocks: []
        }
        this.inputStock = this.inputStock.bind(this)
        this.submit = this.submit.bind(this)
        this.callService = this.callService.bind(this)
    }

    componentDidMount(): void {
        const stockList = ['MSFT', 'AAPL', 'JPM', 'AMZN', 'T', 'F']
        stockList.forEach((stock) => {
            this.callService(stock)
        })
    }

    inputStock(event): void {
        this.setState({stockInput: event.target.value})
    }

    submit(): void {
        this.callService(this.state.stockInput)
        this.setState({stockInput: ''})
    }

    callService(stockSymbol): void {
        setTimeout(function () {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', '/stock?stockSymbol=' + stockSymbol)
            xhr.onload = () => {
                const stocks = this.state.stocks
                if (xhr.status >= 200 && xhr.status < 400) {
                    stocks.push(JSON.parse(xhr.responseText))
                } else {
                    console.log('unsucc ', xhr.responseText)
                    const stock: Stock = {Symbol: stockSymbol, Name: 'Not Found'}
                    stocks.push(stock)
                }
                this.setState({stocks})
            }
            xhr.onerror = () => {
                console.log(xhr)
            }
            xhr.send()
        }, 1000)
    }

    render(): ReactNode {
        return (
            <div>
                <h2 className="text-primary">Stock Quotes</h2>
                <form className="form-inline">
                    <div className="form-group">
                        <label className="sr-only" htmlFor="symbol">Stock Symbol</label>
                        <input type="text" name="stock" id="symbol"
                               className="form-control input-sm" placeholder="Symbol"
                               value={this.state.stockInput}
                               onChange={this.inputStock}/>
                        <input type="button" className="btn-sm btn-default" value="Go!"
                               onClick={this.submit}/>
                    </div>
                </form>
                <h4 className="text-primary">Stock List</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Last Price</th>
                        <th>Time</th>
                        <th>Market Cap</th>
                        <th>Change YTD</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Open</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.stocks.map((stock, i) => {
                            return <tr key={i}>
                                <td>{stock.Symbol}</td>
                                <td>{stock.Name}</td>
                                <td>{stock.LastPrice}</td>
                                <td>{stock.Timestamp}</td>
                                <td>{stock.MarketCap}</td>
                                <td>{stock.ChangeYTD}</td>
                                <td>{stock.High}</td>
                                <td>{stock.Low}</td>
                                <td>{stock.Open}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
