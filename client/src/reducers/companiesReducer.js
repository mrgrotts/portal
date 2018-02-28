import * as actions from '../actions';

const initialState = {
  company: {},
  loading: false,
  error: null,
  success: false
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_COMPANY_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        company: { ...action.company },
        error: null,
        loading: false,
        success: true
      };
    case actions.CREATE_COMPANY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.CREATE_COMPANY_END:
      return {
        ...state,
        success: false
      };
    case actions.READ_COMPANIES_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actions.READ_COMPANIES_SUCCESS:
      return {
        ...state,
        company: action.company,
        loading: false,
        success: true
      };
    case actions.READ_COMPANIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false
      };
    case actions.READ_COMPANIES_END:
      return {
        ...state,
        success: false
      };
    case actions.READ_COMPANY_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actions.READ_COMPANY_SUCCESS:
      return {
        ...state,
        company: { ...action.company },
        loading: false,
        success: true
      };
    case actions.READ_COMPANY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false
      };
    case actions.READ_COMPANY_END:
      return {
        ...state,
        success: false
      };
    case actions.UPDATE_COMPANY_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        company: { ...action.company },
        error: null,
        loading: false,
        success: true
      };
    case actions.UPDATE_COMPANY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.UPDATE_COMPANY_END:
      return {
        ...state,
        success: false
      };
    case actions.DELETE_COMPANY_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        company: {},
        error: null,
        loading: false,
        success: true
      };
    case actions.DELETE_COMPANY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.DELETE_COMPANY_END:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};

export default companyReducer;
