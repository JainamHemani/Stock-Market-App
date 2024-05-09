// StockPrices.js

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStockPrices } from './actions'; // Define your own action

const StockPrices = ({ stockData, fetchStockPrices }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockPrices(); // Dispatch action to fetch stock data
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Live Stock Prices</h1>
      {stockData.map((stock) => (
        <div key={stock.symbol}>
          <p>{stock.name}: {stock.price}</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  stockData: state.stockData,
});

export default connect(mapStateToProps, { fetchStockPrices })(StockPrices);
