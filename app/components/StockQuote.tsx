/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import { type ReactNode, useState, useEffect } from "react";

interface StockQuoteState {
  stockInput: string;
  stocks: Stock[];
}

interface Stock {
  Symbol: string;
  Name: string;
  LastPrice?: string;
  Timestamp?: string;
  MarketCap?: string;
  ChangeYTD?: string;
  High?: string;
  Open?: string;
  Low?: string;
}

export default function StockQuote(): ReactNode {
  const stockList = ["MSFT", "AAPL", "JPM", "AMZN", "T", "F"];
  const [state, setState] = useState<StockQuoteState>(initialState());

  function initialState(): StockQuoteState {
    return {
      stockInput: "",
      stocks: [],
    };
  }

  useEffect(() => {
    const stocks = state.stocks.slice();
    stockList.forEach((stock) => {
      callService(stock)
        .then((stock) => {
          stocks.push(stock);
          setState({ ...state, stocks });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  function inputStock(event): void {
    setState({ ...state, stockInput: event.target.value });
  }

  function submit(): void {
    callService(state.stockInput)
      .then((stock) => {
        const stocks = state.stocks.slice();
        stocks.push(stock);
        setState({ ...state, stocks });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function callService(stockSymbol: string): Promise<Stock> {
    const url = window.location.origin + `/api/stock?stockSymbol=${stockSymbol}`;
    return await fetch(url, {
      method: "POST",
    })
      .then(async (data) => await data.json())
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <h2 className="text-primary">Stock Quotes</h2>
      <form className="form-inline">
        <div className="form-group">
          <label className="sr-only" htmlFor="symbol">
            Stock Symbol
          </label>
          <input
            type="text"
            name="stock"
            id="symbol"
            className="form-control input-sm"
            placeholder="Symbol"
            value={state.stockInput}
            onChange={inputStock}
          />
          <input
            type="button"
            className="btn-sm btn-default"
            value="Go!"
            onClick={submit}
          />
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
          {state.stocks.map((stock, i) => {
            return (
              <tr key={i}>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
