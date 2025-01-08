import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = createRoot(document.getElementById("root"));

root.render(
  // Wrap the App component in a Provider component to make the Redux store available to the entire application
  <Provider store={store}>
    <App />
  </Provider>
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
