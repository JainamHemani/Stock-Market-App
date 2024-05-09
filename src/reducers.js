import { FETCH_STOCKS_REQUEST, FETCH_STOCKS_SUCCESS, FETCH_STOCKS_FAILURE } from './actions';

const initialState = {
  stocks: [],
  loading: false,
  error: null,
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOCKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        loading: false,
        stocks: action.payload,
        error: null,
      };
    case FETCH_STOCKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stockReducer;
