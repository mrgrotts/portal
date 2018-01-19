import * as actions from '../actions';

const initialState = {
  locations: [],
  loading: false,
  error: null,
  success: false
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_LOCATION_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.CREATE_LOCATION_SUCCESS:
      const newLocation = { ...action.location };

      return {
        ...state,
        locations: state.locations.concat(newLocation),
        error: null,
        loading: false,
        success: true
      };
    case actions.CREATE_LOCATION_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.CREATE_LOCATION_END:
      return {
        ...state,
        success: false
      };
    case actions.READ_LOCATIONS_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actions.READ_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.locations,
        loading: false,
        success: true
      };
    case actions.READ_LOCATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false
      };
    case actions.READ_LOCATIONS_END:
      return {
        ...state,
        success: false
      };
    case actions.READ_LOCATION_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actions.READ_LOCATION_SUCCESS:
      const location = { ...action.location };
      return {
        ...state,
        locations: state.locations.filter(loc => loc._id === location._id),
        loading: false,
        success: true
      };
    case actions.READ_LOCATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false
      };
    case actions.READ_LOCATION_END:
      return {
        ...state,
        success: false
      };
    case actions.UPDATE_LOCATION_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.UPDATE_LOCATION_SUCCESS:
      const updatedLocation = { ...action.location };

      return {
        ...state,
        locations: state.locations.concat(updatedLocation),
        error: null,
        loading: false,
        success: true
      };
    case actions.UPDATE_LOCATION_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.UPDATE_LOCATION_END:
      return {
        ...state,
        success: false
      };
    case actions.DELETE_LOCATION_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.DELETE_LOCATION_SUCCESS:
      const deletedLocation = { ...action.location };

      return {
        ...state,
        locations: state.locations.filter(
          location => location._id !== deletedLocation._id
        ),
        error: null,
        loading: false,
        success: true
      };
    case actions.DELETE_LOCATION_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.DELETE_LOCATION_END:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};

export default locationsReducer;
