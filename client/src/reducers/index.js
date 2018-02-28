import { combineReducers } from 'redux';

import authReducer from './authReducer';
import companiesReducer from './companiesReducer';
import locationsReducer from './locationsReducer';
import workReducer from './workReducer';

export default combineReducers({
  auth: authReducer,
  company: companiesReducer,
  locations: locationsReducer,
  work: workReducer
});
