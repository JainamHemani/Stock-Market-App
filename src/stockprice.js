// StockPrices.js
import React from 'react';

const StockPrices = ({ stockData }) => {
  if (!stockData || stockData.length === 0) {
    return <p>No stock data available.</p>;
  }

  return (
    <div>
      <h2>Stock Prices</h2>
      <ul>
        {stockData.map((stock, index) => (
          <li key={index}>
            <strong>{stock['1. symbol']}</strong>: {stock['2. price']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockPrices;
