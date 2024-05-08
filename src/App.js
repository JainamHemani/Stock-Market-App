// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockPrices from './stockprice';

const App = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA', 'NFLX', 'NVDA', 'ADBE', 'PYPL', 'CRM', 'INTC', 'CSCO', 'QCOM', 'JD', 'BABA', 'ORCL', 'IBM', 'TWTR', 'SNAP'];
        const apiKey = 'TPMXIQQ4IIBJGOVX'; // Replace with your Alpha Vantage API key
        const symbolString = symbols.join(',');
        
        const response = await axios.get(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbolString}&apikey=${apiKey}`);
    
        const stocks = response.data['Stock Quotes'];
    
        setStockData(stocks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Error fetching stock data. Please try again later.');
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div>
      <h1>Stock Market App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <StockPrices stockData={stockData} />
      )}
    </div>
  );
};

export default App;
