// System imports
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Application imports
import Application from './application/Application';

// Presentation imports
import './index.scss';
import App from './presentation/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './presentation/store/index';

// Initialize application
const application = new Application();

// Initialize redux store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(application))
);

// Initialize presentation
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
