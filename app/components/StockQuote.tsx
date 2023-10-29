/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import { type ReactNode, useState, useEffect } from 'react'

interface StockQuoteState {
  stockInput: string
  stocks: Stock[]
}

interface Stock {
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

export default function StockQuote (): ReactNode {
  const stockList = ['MSFT', 'AAPL', 'JPM', 'AMZN', 'T', 'F']
  const [state, setState] = useState<StockQuoteState>(initialState())

  function initialState (): StockQuoteState {
    return {
      stockInput: '',
      stocks: []
    }
  }

  useEffect(() => {
    stockList.forEach((stock) => {
      callService(stock)
    })
  }, [])

  function inputStock (event): void {
    setState({ ...state, stockInput: event.target.value })
  }

  function submit (): void {
    callService(state.stockInput)
    setState({ ...state, stockInput: '' })
  }

  function callService (stockSymbol: string): void {
    const stocks = state.stocks
    const xhr = new XMLHttpRequest()
    const url = `/stock?stockSymbol=${stockSymbol}`
    xhr.open('POST', url)
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        stocks.push(JSON.parse(xhr.responseText))
      } else {
        console.log('unsucc ', xhr.responseText)
        const stock: Stock = { Symbol: stockSymbol, Name: 'Not Found' }
        stocks.push(stock)
      }
      return stocks
    }
    xhr.onerror = () => {
      console.log(xhr)
    }
    xhr.send()
  }

  return (
            <div>
                <h2 className="text-primary">Stock Quotes</h2>
                <form className="form-inline">
                    <div className="form-group">
                        <label className="sr-only" htmlFor="symbol">Stock Symbol</label>
                        <input type="text" name="stock" id="symbol"
                               className="form-control input-sm" placeholder="Symbol"
                               value={state.stockInput}
                               onChange={inputStock}/>
                        <input type="button" className="btn-sm btn-default" value="Go!"
                               onClick={submit}/>
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
                        state.stocks.map((stock, i) => {
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
