import React, { Component } from 'react';
import StockList from './StockList';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Stock Price Tracker</h1>
        <StockList />
      </div>
    );
  }
}

export default App;
