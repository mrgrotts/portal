import api from "../api";
const generateAuthorizationHeader = (token = localStorage.getItem("token")) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  api.defaults.headers.common["Cache-Control"] = "max-age=3600";
};

/**************************************************************************************
 * AUTH                                                                               *
 **************************************************************************************/
export const AUTH_START = "auth_start";
export const AUTH_SUCCESS = "auth_success";
export const AUTH_FAIL = "auth_fail";
export const AUTH_LOGOUT = "auth_logout";
export const AUTH_REDIRECT_PATH = "auth_redirect_path";
export const AUTH_CURRENT_USER = "auth_current_user";
export const AUTH_STATE_UPDATE = "auth_state_update";

export const auth = (email, password, registration) => async dispatch => {
  let url = `/auth/login`;

  if (registration) {
    url = `/auth/register`;
  }

  dispatch(authStart());

  await api
    .post(url, {
      email,
      password
    })
    .then(response => {
      console.log(response);
      // create new date using the current date + expiration time in seconds
      const expiration = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expiration", expiration);

      dispatch(authSuccess(response.data.user, response.data.token));
      dispatch(authTimeout(response.data.expiresIn));
      // Primary Data API Calls
      // dispatch(readTickets());
      // dispatch(readLocations());

      generateAuthorizationHeader(response.data.token);
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error));
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
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  return {
    type: AUTH_LOGOUT
  };
};

export const authRedirectPath = path => ({
  type: AUTH_REDIRECT_PATH,
  path
});

export const authCurrentUser = (
  userId = localStorage.getItem("userId")
) => async dispatch => {
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

export const authState = () => async dispatch => {
  const userId = await localStorage.getItem("userId");
  const token = await localStorage.getItem("token");

  if (!token || !userId) {
    dispatch(authLogout());
  }

  await generateAuthorizationHeader(token);
  // const user = await authCurrentUser(userId);

  // convert stored date STRING to a new Date object
  const expiration = new Date(localStorage.getItem("expiration"));

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
 * TICKETS                                                                            *
 **************************************************************************************/
export const READ_TICKETS_START = "read_tickets_start";
export const READ_TICKETS_SUCCESS = "read_tickets_success";
export const READ_TICKETS_FAIL = "read_tickets_fail";
export const READ_TICKETS_END = "read_tickets_end";

export const CREATE_TICKET_START = "create_ticket_start";
export const CREATE_TICKET_SUCCESS = "create_ticket_success";
export const CREATE_TICKET_FAIL = "create_ticket_fail";
export const CREATE_TICKET_END = "create_ticket_end";

export const READ_TICKET_START = "read_ticket_start";
export const READ_TICKET_SUCCESS = "read_ticket_success";
export const READ_TICKET_FAIL = "read_ticket_fail";
export const READ_TICKET_END = "read_ticket_end";

export const UPDATE_TICKET_START = "update_ticket_start";
export const UPDATE_TICKET_SUCCESS = "update_ticket_success";
export const UPDATE_TICKET_FAIL = "update_ticket_fail";
export const UPDATE_TICKET_END = "update_ticket_end";

export const DELETE_TICKET_START = "delete_ticket_start";
export const DELETE_TICKET_SUCCESS = "delete_ticket_success";
export const DELETE_TICKET_FAIL = "delete_ticket_fail";
export const DELETE_TICKET_END = "update_ticket_end";

export const readTickets = () => async dispatch => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readTicketsStart());

  let url = `/users/${userId}/tickets`;

  await api
    .get(url)
    .then(response => dispatch(readTicketsSuccess(response.data)))
    .then(() => dispatch(readTicketsEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readTicketsFail(error));
    });
};

export const readTicketsStart = () => ({
  type: READ_TICKETS_START
});

export const readTicketsSuccess = tickets => ({
  type: READ_TICKETS_SUCCESS,
  tickets
});

export const readTicketsFail = error => ({
  type: READ_TICKETS_FAIL,
  error
});

export const readTicketsEnd = () => ({
  type: READ_TICKETS_END
});

export const createTicket = ticket => async dispatch => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(createTicketStart());

  let url = `/users/${userId}/tickets`;

  await api
    .post(url, ticket)
    .then(response => dispatch(createTicketSuccess(response.data)))
    .then(() => dispatch(createTicketEnd()))
    .catch(error => {
      console.log(error);
      dispatch(createTicketFail(error));
    });
};

export const createTicketStart = () => ({
  type: CREATE_TICKET_START
});

export const createTicketSuccess = ticket => ({
  type: CREATE_TICKET_SUCCESS,
  ticket
});

export const createTicketFail = error => ({
  type: CREATE_TICKET_FAIL,
  error
});

export const createTicketEnd = () => ({
  type: CREATE_TICKET_END
});

export const readTicket = id => async dispatch => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readTicketStart());

  let url = `/users/${userId}/tickets/${id}`;

  await api
    .get(url, id)
    .then(response => dispatch(readTicketSuccess(response.data)))
    .then(() => dispatch(readTicketEnd()))
    .catch(error => {
      console.log(error);
      dispatch(readTicketFail(error));
    });
};

export const readTicketStart = () => ({
  type: READ_TICKET_START
});

export const readTicketSuccess = ticket => ({
  type: READ_TICKET_SUCCESS,
  ticket
});

export const readTicketFail = error => ({
  type: READ_TICKET_FAIL,
  error
});

export const readTicketEnd = () => ({
  type: READ_TICKET_END
});

export const updateTicket = (id, ticket) => async dispatch => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(updateTicketStart());

  let url = `/users/${userId}/tickets/${id}`;

  await api
    .put(url, ticket)
    .then(response => dispatch(updateTicketSuccess(response.data)))
    .then(() => dispatch(updateTicketEnd()))
    .catch(error => {
      console.log(error);
      dispatch(updateTicketFail(error));
    });
};

export const updateTicketStart = () => ({
  type: UPDATE_TICKET_START
});

export const updateTicketSuccess = ticket => ({
  type: UPDATE_TICKET_SUCCESS,
  ticket
});

export const updateTicketFail = error => ({
  type: UPDATE_TICKET_FAIL,
  error
});

export const updateTicketEnd = () => ({
  type: UPDATE_TICKET_END
});

export const deleteTicket = id => async dispatch => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(deleteTicketStart());

  let url = `/users/${userId}/tickets/${id}`;

  await api
    .delete(url, id)
    .then(response => dispatch(deleteTicketSuccess(response.data)))
    .then(() => dispatch(deleteTicketEnd()))
    .catch(error => {
      console.log(error);
      dispatch(deleteTicketFail(error));
    });
};

export const deleteTicketStart = () => ({
  type: DELETE_TICKET_START
});

export const deleteTicketSuccess = ticket => ({
  type: DELETE_TICKET_SUCCESS,
  ticket
});

export const deleteTicketFail = error => ({
  type: DELETE_TICKET_FAIL,
  error
});

export const deleteTicketEnd = () => ({
  type: DELETE_TICKET_END
});

/**************************************************************************************
 * LOCATIONS                                                                          *
 **************************************************************************************/
export const READ_LOCATIONS_START = "read_locations_start";
export const READ_LOCATIONS_SUCCESS = "read_locations_success";
export const READ_LOCATIONS_FAIL = "read_locations_fail";
export const READ_LOCATIONS_END = "read_locations_end";

export const CREATE_LOCATION_START = "create_location_start";
export const CREATE_LOCATION_SUCCESS = "create_location_success";
export const CREATE_LOCATION_FAIL = "create_location_fail";
export const CREATE_LOCATION_END = "create_location_end";

export const READ_LOCATION_START = "read_location_start";
export const READ_LOCATION_SUCCESS = "read_location_success";
export const READ_LOCATION_FAIL = "read_location_fail";
export const READ_LOCATION_END = "read_location_end";

export const UPDATE_LOCATION_START = "update_location_start";
export const UPDATE_LOCATION_SUCCESS = "update_location_success";
export const UPDATE_LOCATION_FAIL = "update_location_fail";
export const UPDATE_LOCATION_END = "update_location_end";

export const DELETE_LOCATION_START = "delete_location_start";
export const DELETE_LOCATION_SUCCESS = "delete_location_success";
export const DELETE_LOCATION_FAIL = "delete_location_fail";
export const DELETE_LOCATION_END = "delete_location_end";

export const readLocations = () => async dispatch => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
export const READ_USERS_START = "read_users_start";
export const READ_USERS_SUCCESS = "read_users_success";
export const READ_USERS_FAIL = "read_users_fail";
export const READ_USERS_END = "read_users_end";

export const CREATE_USER_START = "create_user_start";
export const CREATE_USER_SUCCESS = "create_user_success";
export const CREATE_USER_FAIL = "create_user_fail";
export const CREATE_USER_END = "create_user_end";

export const READ_USER_START = "read_user_start";
export const READ_USER_SUCCESS = "read_user_success";
export const READ_USER_FAIL = "read_user_fail";
export const READ_USER_END = "read_user_end";

export const UPDATE_USER_START = "update_user_start";
export const UPDATE_USER_SUCCESS = "update_user_success";
export const UPDATE_USER_FAIL = "update_user_fail";
export const UPDATE_USER_END = "update_user_end";

export const DELETE_USER_START = "delete_user_start";
export const DELETE_USER_SUCCESS = "delete_user_success";
export const DELETE_USER_FAIL = "delete_user_fail";
export const DELETE_USER_END = "update_user_end";

export const readUsers = () => async dispatch => {
  const token = localStorage.getItem("token");

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
  const token = localStorage.getItem("token");

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
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
