import * as actions from '../actions';

const initialState = {
  id: null,
  token: null,
  error: null,
  loading: false,
  redirectPath: '/'
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        id: action.id,
        token: action.token,
        error: null,
        loading: false
      };
    case actions.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actions.AUTH_LOGOUT:
      return {
        ...state,
        id: null,
        token: null
      };
    case actions.AUTH_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: action.path
      };
    default:
      return state;
  }
};

export default authReducer;
