import React from 'react';
import axios from 'axios';

class StockList extends React.Component {
  state = {
    stocks: [],
    error: ''
  };

  componentDidMount() {

    const companySymbols = ['AAPL', 'MSFT'];

    this.fetchStocks(companySymbols);
  }

  fetchStocks = async (symbols) => {
    const API_KEY = 'KfXLCXLiWtIh1_JcHoqc2QldGV7QyVBW'; 
    const promises = symbols.map(symbol => {
      const API_URL = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?unadjusted=true&apiKey=${API_KEY}`;
      return axios.get(API_URL);
    });

    try {
      const responses = await Promise.all(promises);
      responses.forEach(response => {
        const { data } = response;
        if (data && data.results && data.results.length > 0) {
          const latestQuote = data.results[0];
          const latestPrice = latestQuote.o;
          const latestVolume = latestQuote.v;
          const stockData = {
            symbol: latestQuote.T,
            price: latestPrice,
            volume: latestVolume
          };

          if (!this.state.stocks.some(stock => stock.symbol === stockData.symbol)) {
            this.setState(prevState => ({
              stocks: [...prevState.stocks, stockData]
            }));
          }
        } else if (data && data.error) {
          throw new Error(data.error);
        } else {
          throw new Error('Unknown error occurred.');
        }
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
      this.setState({ error: 'Error fetching stock data. Please try again later.' });
    }
  }

  render() {
    const { stocks, error } = this.state;
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Stock List</h2>
        {error ? (
          <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Symbol</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Price</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Volume</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.symbol}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.price}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default StockList;