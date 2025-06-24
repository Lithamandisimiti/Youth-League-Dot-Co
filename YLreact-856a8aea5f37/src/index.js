import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();*/

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//import App from './App.js'
import YLApp from './redux/reducers/reducers';

// let store = createStore(YLApp, applyMiddleware(thunk, logger));
const store = createStore(YLApp, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
