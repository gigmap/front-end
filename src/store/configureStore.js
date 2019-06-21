import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import createRootReducer from './reducers';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};

export default function configureStore(initialState) {
  // Redux Configuration
  const rootReducer = createRootReducer();
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middleware = [];
  const enhancers = [];

  middleware.push(thunk);

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });

    middleware.push(logger);
  }

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = compose(...enhancers);

  // Create Store
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);

  return {store, persistor};
};