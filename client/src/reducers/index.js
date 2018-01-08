import { combineReducers } from 'redux';

import authReducer from './authReducer';
import ticketsReducer from './ticketsReducer';

export default combineReducers({
  auth: authReducer,
  tickets: ticketsReducer
});
