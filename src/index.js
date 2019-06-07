import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import App from './components/app/App';
// import {connectToStore} from './api';

const {store, persistor} = configureStore({});
// connectToStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();