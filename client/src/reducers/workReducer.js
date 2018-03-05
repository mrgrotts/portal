import * as actions from '../actions';

const initialState = {
  workList: [],
  loading: false,
  error: null,
  success: false
};

const workReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_WORK_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.CREATE_WORK_SUCCESS:
      const newWork = { ...action.work };

      return {
        ...state,
        workList: state.workList.concat(newWork),
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
        workList: action.workList,
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
      const work = { ...action.work };

      return {
        ...state,
        workList: state.workList.filter(w => w._id === work._id),
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
      const updatedWork = { ...action.work };

      return {
        ...state,
        workList: state.workList.concat(updatedWork),
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
      const deletedWork = { ...action.work };

      return {
        ...state,
        workList: state.workList.filter(work => work._id !== deletedWork._id),
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
      const uploadedMedia = { ...action.media };

      return {
        ...state,
        workList: state.workList.media.concat(uploadedMedia),
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
    case actions.DOWNLOAD_MEDIA_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.DOWNLOAD_MEDIA_SUCCESS:
      const downloadedMedia = { ...action.media };

      return {
        ...state,
        workList: state.workList.media.concat(downloadedMedia),
        error: null,
        loading: false,
        success: true
      };
    case actions.DOWNLOAD_MEDIA_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.DOWNLOAD_MEDIA_END:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};

export default workReducer;
