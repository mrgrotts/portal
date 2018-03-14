import * as actions from '../actions';

const initialState = {
  workList: [],
  loading: false,
  error: null,
  success: false
};

const workReducer = (state = initialState, action) => {
  const createWork = created => state.workList.concat(created);
  const readWork = read => state.workList.find(w => w._id === read._id);
  const updateWork = updated => state.workList.filter(w => w._id !== updated._id).map(work => (work = updated));
  const deleteWork = deleted => state.workList.filter(w => w._id !== deleted._id);

  switch (action.type) {
    case actions.CREATE_WORK_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.CREATE_WORK_SUCCESS:
      return {
        ...state,
        workList: createWork({ ...action.work }),
        error: null,
        loading: false,
        success: true
      };
    case actions.CREATE_WORK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.CREATE_WORK_END:
      return {
        ...state,
        success: false
      };
    case actions.READ_WORKLIST_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actions.READ_WORKLIST_SUCCESS:
      return {
        ...state,
        workList: action.work,
        loading: false,
        success: true
      };
    case actions.READ_WORKLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false
      };
    case actions.READ_WORKLIST_END:
      return {
        ...state,
        success: false
      };
    case actions.READ_WORK_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actions.READ_WORK_SUCCESS:
      return {
        ...state,
        workList: readWork({ ...action.work }),
        loading: false,
        success: true
      };
    case actions.READ_WORK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false
      };
    case actions.READ_WORK_END:
      return {
        ...state,
        success: false
      };
    case actions.UPDATE_WORK_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.UPDATE_WORK_SUCCESS:
      return {
        ...state,
        workList: updateWork({ ...action.work }),
        error: null,
        loading: false,
        success: true
      };
    case actions.UPDATE_WORK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.UPDATE_WORK_END:
      return {
        ...state,
        success: false
      };
    case actions.DELETE_WORK_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.DELETE_WORK_SUCCESS:
      return {
        ...state,
        workList: deleteWork({ ...action.work }),
        error: null,
        loading: false,
        success: true
      };
    case actions.DELETE_WORK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.DELETE_WORK_END:
      return {
        ...state,
        success: false
      };

    case actions.UPLOAD_MEDIA_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.UPLOAD_MEDIA_SUCCESS:
      return {
        ...state,
        workList: updateWork({ ...action.work }),
        error: null,
        loading: false,
        success: true
      };
    case actions.UPLOAD_MEDIA_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.UPLOAD_MEDIA_END:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};

export default workReducer;
