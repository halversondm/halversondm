/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React from "react";
import $ from "jQuery";

const StockQuote = React.createClass({
  getInitialState() {
    return {
      stockInput: "",
      stocks: []
    };
  },
  componentDidMount() {
    const stockList = ["MSFT", "AAPL", "JPM", "AMZN", "T", "F"];
    stockList.forEach(stock => {
      setTimeout(this.callService(stock), 1000);
    });
  },
  inputStock(event) {
    this.setState({stockInput: event.target.value});
  },
  submit() {
    this.callService(this.state.stockInput);
    this.setState({stockInput: ""});
  },
  callService(stockSymbol) {
    var url = "http://dev.markitondemand.com/Api/v2/Quote/jsonp?&symbol=" + stockSymbol;
    $.ajax({
      url: url,
      dataType: "jsonp"
    }).then(data => {
      var stocks = this.state.stocks;
      stocks.push(data);
      this.setState({stocks: stocks});
    }, () => {
      var stocks = this.state.stocks;
      var stock = {Symbol: stockSymbol, Name: "Not Found"};
      stocks.push(stock);
      this.setState({stocks: stocks});
    });
  },
  render() {
    return <div>
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
            </tr>;
          })
        }
        </tbody>
      </table>
    </div>;
  }
});

export default StockQuote;
