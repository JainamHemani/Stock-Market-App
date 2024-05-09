// actions.js

export const fetchStockPrices = () => async (dispatch) => {
  try {
    const response = await fetch('https://api.example.com/stock-prices');
    const data = await response.json();
    dispatch({ type: 'FETCH_STOCK_PRICES', payload: data });
  } catch (error) {
    console.error('Error fetching stock prices:', error);
  }
};

// reducers.js

const initialState = {
  stockData: [],
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_STOCK_PRICES':
      return { ...state, stockData: action.payload };
    default:
      return state;
  }
};

export default stockReducer;
