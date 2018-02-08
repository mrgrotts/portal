import { combineReducers } from 'redux';

import authReducer from './authReducer';
import locationsReducer from './locationsReducer';
import workReducer from './workReducer';

export default combineReducers({
  auth: authReducer,
  locations: locationsReducer,
  workList: workReducer
});
