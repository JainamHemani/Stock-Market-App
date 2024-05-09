import React from 'react';

const StockItem = ({ stock }) => {
  return (
    <div>
      <h2>{stock['1. symbol']}</h2>
      <p>Price: {stock['2. price']}</p>
      <p>Last Updated: {stock['4. timestamp']}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default StockItem;
