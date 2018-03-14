import api from '../api';
const generateAuthorizationHeader = (token = localStorage.getItem('token')) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  api.defaults.headers.common['Cache-Control'] = 'max-age=3600';
};

/**************************************************************************************
 * AUTH                                                                               *
 **************************************************************************************/
export const AUTH_START = 'auth_start';
export const AUTH_SUCCESS = 'auth_success';
export const AUTH_FAIL = 'auth_fail';
export const AUTH_LOGOUT = 'auth_logout';
export const AUTH_REDIRECT_PATH = 'auth_redirect_path';
export const AUTH_CURRENT_USER = 'auth_current_user';
export const AUTH_STATE_UPDATE = 'auth_state_update';

export const authLogin = (email, password) => async dispatch => {
  let url = `/auth/login`;

  dispatch(authStart());

  await api
    .post(url, {
      email,
      password
    })
    .then(response => {
      // console.log(response);
      // create new date using the current date + expiration time in seconds
      const expiration = new Date(new Date().getTime() + response.data.expiresIn * 1000);

      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', expiration);

      dispatch(authSuccess(response.data.user, response.data.token));
      dispatch(authTimeout(response.data.expiresIn));
      // Primary Data API Calls
      // dispatch(readWorkList());
      // dispatch(readLocations());

      generateAuthorizationHeader(response.data.token);
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error.message));
    });
};

export const authRegister = (email, password) => async dispatch => {
  let url = `/auth/register`;

  dispatch(authStart());

  await api
    .post(url, {
      email,
      password
    })
    .then(response => {
      console.log(response);
      // create new date using the current date + expiration time in seconds
      const expiration = new Date(new Date().getTime() + response.data.expiresIn * 1000);

      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', expiration);

      dispatch(authSuccess(response.data.user, response.data.token));
      dispatch(authTimeout(response.data.expiresIn));
      generateAuthorizationHeader(response.data.token);
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error.message));
    });
};

export const authStart = () => ({
  type: AUTH_START
});

export const authSuccess = (user, token) => ({
  type: AUTH_SUCCESS,
  user,
  token
});

export const authFail = error => ({
  type: AUTH_FAIL,
  error
});

export const authTimeout = expiration => dispatch => {
  setTimeout(() => {
    // convert expiration from seconds to milliseconds
    // expiration is 60 minutes
    dispatch(authLogout());
  }, expiration * 1000);
};

export const authLogout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');

  return {
    type: AUTH_LOGOUT
  };
};

export const authRedirectPath = path => ({
  type: AUTH_REDIRECT_PATH,
  path
});

export const authCurrentUser = (userId = localStorage.getItem('userId')) => async dispatch => {
  // console.log("[UserId]", userId);

  if (userId) {
    const response = await api.get(`/users/${userId}`);
    // console.log("[User]", response);

    return dispatch({
      type: AUTH_CURRENT_USER,
      user: response.data
    });
  }
};

export const authState = () => dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token || !userId) {
    dispatch(authLogout());
  }

  generateAuthorizationHeader(token);

  // convert stored date STRING to a new Date object
  const expiration = new Date(localStorage.getItem('expiration'));

  // console.log(user, userId, token, expiration);

  // compare expiration to current time
  if (expiration <= new Date()) {
    dispatch(authLogout());
  } else {
    dispatch(authStateUpdate(userId, token));
    dispatch(authTimeout((expiration.getTime() - new Date().getTime()) / 1000));
  }
};

export const authStateUpdate = (userId, token) => ({
  type: AUTH_STATE_UPDATE,
  userId,
  token
});

/**************************************************************************************
 * COMPANIES                                                                          *
 **************************************************************************************/
export const READ_COMPANIES_START = 'read_companies_start';
export const READ_COMPANIES_SUCCESS = 'read_companies_success';
export const READ_COMPANIES_FAIL = 'read_companies_fail';
export const READ_COMPANIES_END = 'read_companies_end';

export const CREATE_COMPANY_START = 'create_company_start';
export const CREATE_COMPANY_SUCCESS = 'create_company_success';
export const CREATE_COMPANY_FAIL = 'create_company_fail';
export const CREATE_COMPANY_END = 'create_company_end';

export const READ_COMPANY_START = 'read_company_start';
export const READ_COMPANY_SUCCESS = 'read_company_success';
export const READ_COMPANY_FAIL = 'read_company_fail';
export const READ_COMPANY_END = 'read_company_end';

export const UPDATE_COMPANY_START = 'update_company_start';
export const UPDATE_COMPANY_SUCCESS = 'update_company_success';
export const UPDATE_COMPANY_FAIL = 'update_company_fail';
export const UPDATE_COMPANY_END = 'update_company_end';

export const DELETE_COMPANY_START = 'delete_company_start';
export const DELETE_COMPANY_SUCCESS = 'delete_company_success';
export const DELETE_COMPANY_FAIL = 'delete_company_fail';
export const DELETE_COMPANY_END = 'delete_company_end';

export const readCompanies = () => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readCompaniesStart());

  let url = `/users/${userId}/companies`;

  await api
    .get(url)
    .then(response => dispatch(readCompaniesSuccess(response.data)))
    .then(() => dispatch(readCompaniesEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readCompaniesFail(error));
    });
};

export const readCompaniesStart = () => ({
  type: READ_COMPANIES_START
});

export const readCompaniesSuccess = companies => ({
  type: READ_COMPANIES_SUCCESS,
  companies
});

export const readCompaniesFail = error => ({
  type: READ_COMPANIES_FAIL,
  error
});

export const readCompaniesEnd = () => ({
  type: READ_COMPANIES_END
});

export const createCompany = company => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(createCompanyStart());

  let url = `/users/${userId}/companies`;

  await api
    .post(url, company)
    .then(response => dispatch(createCompanySuccess(response.data)))
    .then(() => dispatch(createCompanyEnd()))
    .catch(error => {
      console.log(error);
      dispatch(createCompanyFail(error));
    });
};

export const createCompanyStart = () => ({
  type: CREATE_COMPANY_START
});

export const createCompanySuccess = company => ({
  type: CREATE_COMPANY_SUCCESS,
  company
});

export const createCompanyFail = error => ({
  type: CREATE_COMPANY_FAIL,
  error
});

export const createCompanyEnd = () => ({
  type: CREATE_COMPANY_END
});

export const readCompany = id => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readCompanyStart());

  let url = `/users/${userId}/companies/${id}`;

  await api
    .get(url, id)
    .then(response => dispatch(readCompanySuccess(response.data)))
    .then(() => dispatch(readCompanyEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readCompanyFail(error));
    });
};

export const readCompanyStart = () => ({
  type: READ_COMPANY_START
});

export const readCompanySuccess = company => ({
  type: READ_COMPANY_SUCCESS,
  company
});

export const readCompanyFail = error => ({
  type: READ_COMPANY_FAIL,
  error
});

export const readCompanyEnd = () => ({
  type: READ_COMPANY_END
});

export const updateCompany = (id, company) => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(updateCompanyStart());

  let url = `/users/${userId}/companies/${id}`;

  await api
    .put(url, company)
    .then(response => dispatch(updateCompanySuccess(response.data)))
    .then(() => dispatch(updateCompanyEnd()))
    .catch(error => {
      console.log(error);
      dispatch(updateCompanyFail(error));
    });
};

export const updateCompanyStart = () => ({
  type: UPDATE_COMPANY_START
});

export const updateCompanySuccess = company => ({
  type: UPDATE_COMPANY_SUCCESS,
  company
});

export const updateCompanyFail = error => ({
  type: UPDATE_COMPANY_FAIL,
  error
});

export const updateCompanyEnd = () => ({
  type: UPDATE_COMPANY_END
});

export const deleteCompany = id => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(deleteCompanyStart());

  let url = `/users/${userId}/companies/${id}`;

  await api
    .delete(url, id)
    .then(response => dispatch(deleteCompanySuccess(response.data)))
    .then(() => dispatch(deleteCompanyEnd()))
    .catch(error => {
      console.log(error);
      dispatch(deleteCompanyFail(error));
    });
};

export const deleteCompanyStart = () => ({
  type: DELETE_COMPANY_START
});

export const deleteCompanySuccess = company => ({
  type: DELETE_COMPANY_SUCCESS,
  company
});

export const deleteCompanyFail = error => ({
  type: DELETE_COMPANY_FAIL,
  error
});

export const deleteCompanyEnd = () => ({
  type: DELETE_COMPANY_END
});

/**************************************************************************************
 * WORKLIST                                                                            *
 **************************************************************************************/
export const READ_WORKLIST_START = 'read_workList_start';
export const READ_WORKLIST_SUCCESS = 'read_workList_success';
export const READ_WORKLIST_FAIL = 'read_workList_fail';
export const READ_WORKLIST_END = 'read_workList_end';

export const CREATE_WORK_START = 'create_work_start';
export const CREATE_WORK_SUCCESS = 'create_work_success';
export const CREATE_WORK_FAIL = 'create_work_fail';
export const CREATE_WORK_END = 'create_work_end';

export const READ_WORK_START = 'read_work_start';
export const READ_WORK_SUCCESS = 'read_work_success';
export const READ_WORK_FAIL = 'read_work_fail';
export const READ_WORK_END = 'read_work_end';

export const UPDATE_WORK_START = 'update_work_start';
export const UPDATE_WORK_SUCCESS = 'update_work_success';
export const UPDATE_WORK_FAIL = 'update_work_fail';
export const UPDATE_WORK_END = 'update_work_end';

export const DELETE_WORK_START = 'delete_work_start';
export const DELETE_WORK_SUCCESS = 'delete_work_success';
export const DELETE_WORK_FAIL = 'delete_work_fail';
export const DELETE_WORK_END = 'update_work_end';

export const UPLOAD_MEDIA_START = 'upload_media_start';
export const UPLOAD_MEDIA_SUCCESS = 'upload_media_success';
export const UPLOAD_MEDIA_FAIL = 'upload_media_fail';
export const UPLOAD_MEDIA_END = 'upload_media_end';

export const DOWNLOAD_MEDIA_START = 'download_media_start';
export const DOWNLOAD_MEDIA_SUCCESS = 'download_media_success';
export const DOWNLOAD_MEDIA_FAIL = 'download_media_fail';
export const DOWNLOAD_MEDIA_END = 'download_media_end';

export const uploadMedia = (files, id) => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(uploadMediaStart());

  let media = new FormData();

  for (let file in files) {
    // console.log(files[file]);

    media.append('media', files[file]);
    media.append('userId', userId);
  }

  // console.log(media);

  let url = `/users/${userId}/work/${id}/media`;

  await api
    .post(url, media, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    })
    .then(response => dispatch(uploadMediaSuccess(response.data)))
    .then(() => dispatch(uploadMediaEnd()))
    .catch(error => {
      console.log(error.message);
      dispatch(uploadMediaFail(error.message));
    });
};

export const uploadMediaStart = () => ({
  type: UPLOAD_MEDIA_START
});

export const uploadMediaSuccess = work => ({
  type: UPLOAD_MEDIA_SUCCESS,
  work
});

export const uploadMediaFail = error => ({
  type: UPLOAD_MEDIA_FAIL,
  error
});

export const uploadMediaEnd = () => ({
  type: UPLOAD_MEDIA_END
});

export const readWorkList = () => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readWorkListStart());

  let url = `/users/${userId}/work`;

  await api
    .get(url)
    .then(response => dispatch(readWorkListSuccess(response.data)))
    .then(() => dispatch(readWorkListEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readWorkListFail(error));
    });
};

export const readWorkListStart = () => ({
  type: READ_WORKLIST_START
});

export const readWorkListSuccess = work => ({
  type: READ_WORKLIST_SUCCESS,
  work
});

export const readWorkListFail = error => ({
  type: READ_WORKLIST_FAIL,
  error
});

export const readWorkListEnd = () => ({
  type: READ_WORKLIST_END
});

export const createWork = work => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(createWorkStart());

  let url = `/users/${userId}/work`;

  let media = null;
  if (work.media.length > 0) {
    media = new FormData();

    for (let file in work.media) {
      console.log(work.media[file]);

      media.append('media', work.media[file]);
      media.append('userId', userId);
    }
  }

  media = work.media;

  await api
    .post(url, work)
    .then(response => {
      console.log(response.data);
      dispatch(createWorkSuccess(response.data));
    })
    .then(() => dispatch(createWorkEnd()))
    .catch(error => {
      console.log(error);
      dispatch(createWorkFail(error));
    });
};

export const createWorkStart = () => ({
  type: CREATE_WORK_START
});

export const createWorkSuccess = work => ({
  type: CREATE_WORK_SUCCESS,
  work
});

export const createWorkFail = error => ({
  type: CREATE_WORK_FAIL,
  error
});

export const createWorkEnd = () => ({
  type: CREATE_WORK_END
});

export const readWork = id => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readWorkStart());

  let url = `/users/${userId}/work/${id}`;

  await api
    .get(url, id)
    .then(response => dispatch(readWorkSuccess(response.data)))
    .then(() => dispatch(readWorkEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readWorkFail(error));
    });
};

export const readWorkStart = () => ({
  type: READ_WORK_START
});

export const readWorkSuccess = work => ({
  type: READ_WORK_SUCCESS,
  work
});

export const readWorkFail = error => ({
  type: READ_WORK_FAIL,
  error
});

export const readWorkEnd = () => ({
  type: READ_WORK_END
});

export const updateWork = (id, work) => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(updateWorkStart());

  let url = `/users/${userId}/work/${id}`;

  await api
    .put(url, work)
    .then(response => dispatch(updateWorkSuccess(response.data)))
    .then(() => dispatch(updateWorkEnd()))
    .catch(error => {
      console.log(error);
      dispatch(updateWorkFail(error));
    });
};

export const updateWorkStart = () => ({
  type: UPDATE_WORK_START
});

export const updateWorkSuccess = work => ({
  type: UPDATE_WORK_SUCCESS,
  work
});

export const updateWorkFail = error => ({
  type: UPDATE_WORK_FAIL,
  error
});

export const updateWorkEnd = () => ({
  type: UPDATE_WORK_END
});

export const deleteWork = id => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(deleteWorkStart());

  let url = `/users/${userId}/work/${id}`;

  await api
    .delete(url, id)
    .then(response => dispatch(deleteWorkSuccess(response.data)))
    .then(() => dispatch(deleteWorkEnd()))
    .catch(error => {
      console.log(error);
      dispatch(deleteWorkFail(error));
    });
};

export const deleteWorkStart = () => ({
  type: DELETE_WORK_START
});

export const deleteWorkSuccess = work => ({
  type: DELETE_WORK_SUCCESS,
  work
});

export const deleteWorkFail = error => ({
  type: DELETE_WORK_FAIL,
  error
});

export const deleteWorkEnd = () => ({
  type: DELETE_WORK_END
});

/**************************************************************************************
 * LOCATIONS                                                                          *
 **************************************************************************************/
export const READ_LOCATIONS_START = 'read_locations_start';
export const READ_LOCATIONS_SUCCESS = 'read_locations_success';
export const READ_LOCATIONS_FAIL = 'read_locations_fail';
export const READ_LOCATIONS_END = 'read_locations_end';

export const CREATE_LOCATION_START = 'create_location_start';
export const CREATE_LOCATION_SUCCESS = 'create_location_success';
export const CREATE_LOCATION_FAIL = 'create_location_fail';
export const CREATE_LOCATION_END = 'create_location_end';

export const READ_LOCATION_START = 'read_location_start';
export const READ_LOCATION_SUCCESS = 'read_location_success';
export const READ_LOCATION_FAIL = 'read_location_fail';
export const READ_LOCATION_END = 'read_location_end';

export const UPDATE_LOCATION_START = 'update_location_start';
export const UPDATE_LOCATION_SUCCESS = 'update_location_success';
export const UPDATE_LOCATION_FAIL = 'update_location_fail';
export const UPDATE_LOCATION_END = 'update_location_end';

export const DELETE_LOCATION_START = 'delete_location_start';
export const DELETE_LOCATION_SUCCESS = 'delete_location_success';
export const DELETE_LOCATION_FAIL = 'delete_location_fail';
export const DELETE_LOCATION_END = 'delete_location_end';

export const readLocations = () => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readLocationsStart());

  let url = `/users/${userId}/locations`;

  await api
    .get(url)
    .then(response => dispatch(readLocationsSuccess(response.data)))
    .then(() => dispatch(readLocationsEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readLocationsFail(error));
    });
};

export const readLocationsStart = () => ({
  type: READ_LOCATIONS_START
});

export const readLocationsSuccess = locations => ({
  type: READ_LOCATIONS_SUCCESS,
  locations
});

export const readLocationsFail = error => ({
  type: READ_LOCATIONS_FAIL,
  error
});

export const readLocationsEnd = () => ({
  type: READ_LOCATIONS_END
});

export const createLocation = location => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(createLocationStart());

  let url = `/users/${userId}/locations`;

  await api
    .post(url, location)
    .then(response => dispatch(createLocationSuccess(response.data)))
    .then(() => dispatch(createLocationEnd()))
    .catch(error => {
      console.log(error);
      dispatch(createLocationFail(error));
    });
};

export const createLocationStart = () => ({
  type: CREATE_LOCATION_START
});

export const createLocationSuccess = location => ({
  type: CREATE_LOCATION_SUCCESS,
  location
});

export const createLocationFail = error => ({
  type: CREATE_LOCATION_FAIL,
  error
});

export const createLocationEnd = () => ({
  type: CREATE_LOCATION_END
});

export const readLocation = id => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readLocationStart());

  let url = `/users/${userId}/locations/${id}`;

  await api
    .get(url, id)
    .then(response => dispatch(readLocationSuccess(response.data)))
    .then(() => dispatch(readLocationEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readLocationFail(error));
    });
};

export const readLocationStart = () => ({
  type: READ_LOCATION_START
});

export const readLocationSuccess = location => ({
  type: READ_LOCATION_SUCCESS,
  location
});

export const readLocationFail = error => ({
  type: READ_LOCATION_FAIL,
  error
});

export const readLocationEnd = () => ({
  type: READ_LOCATION_END
});

export const updateLocation = (id, location) => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(updateLocationStart());

  let url = `/users/${userId}/locations/${id}`;

  await api
    .put(url, location)
    .then(response => dispatch(updateLocationSuccess(response.data)))
    .then(() => dispatch(updateLocationEnd()))
    .catch(error => {
      console.log(error);
      dispatch(updateLocationFail(error));
    });
};

export const updateLocationStart = () => ({
  type: UPDATE_LOCATION_START
});

export const updateLocationSuccess = location => ({
  type: UPDATE_LOCATION_SUCCESS,
  location
});

export const updateLocationFail = error => ({
  type: UPDATE_LOCATION_FAIL,
  error
});

export const updateLocationEnd = () => ({
  type: UPDATE_LOCATION_END
});

export const deleteLocation = id => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(deleteLocationStart());

  let url = `/users/${userId}/locations/${id}`;

  await api
    .delete(url, id)
    .then(response => dispatch(deleteLocationSuccess(response.data)))
    .then(() => dispatch(deleteLocationEnd()))
    .catch(error => {
      console.log(error);
      dispatch(deleteLocationFail(error));
    });
};

export const deleteLocationStart = () => ({
  type: DELETE_LOCATION_START
});

export const deleteLocationSuccess = location => ({
  type: DELETE_LOCATION_SUCCESS,
  location
});

export const deleteLocationFail = error => ({
  type: DELETE_LOCATION_FAIL,
  error
});

export const deleteLocationEnd = () => ({
  type: DELETE_LOCATION_END
});

/**************************************************************************************
 * USERS                                                                              *
 **************************************************************************************/
export const READ_USERS_START = 'read_users_start';
export const READ_USERS_SUCCESS = 'read_users_success';
export const READ_USERS_FAIL = 'read_users_fail';
export const READ_USERS_END = 'read_users_end';

export const CREATE_USER_START = 'create_user_start';
export const CREATE_USER_SUCCESS = 'create_user_success';
export const CREATE_USER_FAIL = 'create_user_fail';
export const CREATE_USER_END = 'create_user_end';

export const READ_USER_START = 'read_user_start';
export const READ_USER_SUCCESS = 'read_user_success';
export const READ_USER_FAIL = 'read_user_fail';
export const READ_USER_END = 'read_user_end';

export const UPDATE_USER_START = 'update_user_start';
export const UPDATE_USER_SUCCESS = 'update_user_success';
export const UPDATE_USER_FAIL = 'update_user_fail';
export const UPDATE_USER_END = 'update_user_end';

export const DELETE_USER_START = 'delete_user_start';
export const DELETE_USER_SUCCESS = 'delete_user_success';
export const DELETE_USER_FAIL = 'delete_user_fail';
export const DELETE_USER_END = 'update_user_end';

export const readUsers = () => async dispatch => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readUsersStart());

  let url = `/users`;

  await api
    .get(url)
    .then(response => dispatch(readUsersSuccess(response.data)))
    .then(() => dispatch(readUsersEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readUsersFail(error));
    });
};

export const readUsersStart = () => ({
  type: READ_USERS_START
});

export const readUsersSuccess = users => ({
  type: READ_USERS_SUCCESS,
  users
});

export const readUsersFail = error => ({
  type: READ_USERS_FAIL,
  error
});

export const readUsersEnd = () => ({
  type: READ_USERS_END
});

export const createUser = user => async dispatch => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(createUserStart());

  let url = `/users`;

  await api
    .post(url, user)
    .then(response => dispatch(createUserSuccess(response.data)))
    .then(() => dispatch(createUserEnd()))
    .catch(error => {
      console.log(error);
      dispatch(createUserFail(error));
    });
};

export const createUserStart = () => ({
  type: CREATE_USER_START
});

export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  user
});

export const createUserFail = error => ({
  type: CREATE_USER_FAIL,
  error
});

export const createUserEnd = () => ({
  type: CREATE_USER_END
});

export const readUser = () => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readUserStart());

  let url = `/users/${userId}`;

  await api
    .get(url, userId)
    .then(response => dispatch(readUserSuccess(response.data)))
    .then(() => dispatch(readUserEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readUserFail(error));
    });
};

export const readUserStart = () => ({
  type: READ_USER_START
});

export const readUserSuccess = user => ({
  type: READ_USER_SUCCESS,
  user
});

export const readUserFail = error => ({
  type: READ_USER_FAIL,
  error
});

export const readUserEnd = () => ({
  type: READ_USER_END
});

export const updateUser = user => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(updateUserStart());

  let url = `/users/${userId}`;

  await api
    .put(url, user)
    .then(response => dispatch(updateUserSuccess(response.data)))
    .then(() => dispatch(updateUserEnd()))
    .catch(error => {
      console.log(error);
      dispatch(updateUserFail(error));
    });
};

export const updateUserStart = () => ({
  type: UPDATE_USER_START
});

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  user
});

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  error
});

export const updateUserEnd = () => ({
  type: UPDATE_USER_END
});

export const deleteUser = user => async dispatch => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(deleteUserStart());

  let url = `/users/${userId}`;

  await api
    .delete(url, userId)
    .then(response => dispatch(deleteUserSuccess(response.data)))
    .then(() => dispatch(deleteUserEnd()))
    .catch(error => {
      console.log(error);
      dispatch(deleteUserFail(error));
    });
};

export const deleteUserStart = () => ({
  type: DELETE_USER_START
});

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  user
});

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  error
});

export const deleteUserEnd = () => ({
  type: DELETE_USER_END
});
