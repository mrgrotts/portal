import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from '../reducers';

const composeEnhancers =
  // this environment variable is available because of create-react-app
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default () => {
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
};
