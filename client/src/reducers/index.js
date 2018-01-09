import { combineReducers } from 'redux';

import authReducer from './authReducer';
import locationsReducer from './locationsReducer';
import ticketsReducer from './ticketsReducer';

export default combineReducers({
  auth: authReducer,
  locations: locationsReducer,
  tickets: ticketsReducer
});
