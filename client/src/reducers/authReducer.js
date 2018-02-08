import * as actions from '../actions';

const initialState = {
  user: {},
  userId: null,
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
        user: action.user,
        userId: action.user._id,
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
        user: {},
        token: null
      };
    case actions.AUTH_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: action.path
      };
    case actions.AUTH_CURRENT_USER:
      return {
        ...state,
        user: action.user,
        error: null,
        loading: false
      };
    case actions.AUTH_STATE_UPDATE:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        error: null,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
