import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default () => {
  let store;

  // this environment variable is available because of create-react-app
  process.env.NODE_ENV === 'development'
    ? (store = createStore(
        reducer,
        composeWithDevTools(applyMiddleware(...middleware))
      ))
    : (store = createStore(reducer, applyMiddleware(...middleware)));

  return store;
};
