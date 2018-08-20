import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/index';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { StripeProvider } from 'react-stripe-elements';

// require('../../public/style.css');
// import "./css/style.css";
import './../../public/style.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers);

// const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
      <App />
    </StripeProvider>
  </Provider>,
  document.getElementById('app')
);
