import api from '../api';
let generateAuthorizationHeader = (token = localStorage.getItem('token')) =>
  (api.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const AUTH_START = 'auth_start';
export const AUTH_SUCCESS = 'auth_success';
export const AUTH_FAIL = 'auth_fail';
export const AUTH_LOGOUT = 'auth_logout';
export const AUTH_REDIRECT_PATH = 'auth_redirect_path';

export const READ_TICKETS_START = 'read_tickets_start';
export const READ_TICKETS_SUCCESS = 'read_tickets_success';
export const READ_TICKETS_FAIL = 'read_tickets_fail';

export const CREATE_TICKET = 'create_ticket';
export const CREATE_TICKET_START = 'create_ticket_start';
export const CREATE_TICKET_SUCCESS = 'create_ticket_success';
export const CREATE_TICKET_FAIL = 'create_ticket_fail';

export const READ_TICKET_START = 'read_ticket_start';
export const READ_TICKET_SUCCESS = 'read_ticket_success';
export const READ_TICKET_FAIL = 'read_ticket_fail';

export const UPDATE_TICKET_START = 'update_ticket_start';
export const UPDATE_TICKET_SUCCESS = 'update_ticket_success';
export const UPDATE_TICKET_FAIL = 'update_ticket_fail';

export const DELETE_TICKET_START = 'delete_ticket_start';
export const DELETE_TICKET_SUCCESS = 'delete_ticket_success';
export const DELETE_TICKET_FAIL = 'delete_ticket_fail';

export const READ_LOCATIONS_START = 'read_locations_start';
export const READ_LOCATIONS_SUCCESS = 'read_locations_success';
export const READ_LOCATIONS_FAIL = 'read_locations_fail';

export const CREATE_LOCATION = 'create_location';
export const CREATE_LOCATION_START = 'create_location_start';
export const CREATE_LOCATION_SUCCESS = 'create_location_success';
export const CREATE_LOCATION_FAIL = 'create_location_fail';

export const READ_LOCATION_START = 'read_location_start';
export const READ_LOCATION_SUCCESS = 'read_location_success';
export const READ_LOCATION_FAIL = 'read_location_fail';

export const UPDATE_LOCATION_START = 'update_location_start';
export const UPDATE_LOCATION_SUCCESS = 'update_location_success';
export const UPDATE_LOCATION_FAIL = 'update_location_fail';

export const DELETE_LOCATION_START = 'delete_location_start';
export const DELETE_LOCATION_SUCCESS = 'delete_location_success';
export const DELETE_LOCATION_FAIL = 'delete_location_fail';

/**************************************************************************************
 * AUTH                                                                               *
 **************************************************************************************/

export const auth = (email, password, registration) => dispatch => {
  let url = `/auth/login`;

  if (registration) {
    url = `/auth/register`;
  }

  dispatch(authStart());

  api
    .post(url, {
      email,
      password
    })
    .then(response => {
      // create new date using the current date + expiration time in seconds
      const expiration = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      localStorage.setItem('user', response.data.userId);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', expiration);

      dispatch(authSuccess(response.data.token, response.data.userId));
      dispatch(authTimeout(response.data.expiresIn));
      // Alternative API Call -- dispatch(readTickets());

      generateAuthorizationHeader(response.data.token);
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error.response.data.error));
    });
};

export const authStart = () => ({
  type: AUTH_START
});

export const authSuccess = (id, token) => ({
  type: AUTH_SUCCESS,
  id,
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
  localStorage.removeItem('user');
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

export const authState = () => dispatch => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  // convert stored date STRING to a new Date object
  const expiration = new Date(localStorage.getItem('expiration'));

  // compare expiration to current time
  if (expiration <= new Date()) {
    dispatch(authLogout());
  } else {
    const user = localStorage.getItem('user');

    dispatch(authSuccess(token, user));
    dispatch(authTimeout((expiration.getTime() - new Date().getTime()) / 1000));

    generateAuthorizationHeader(token);
  }
};

/**************************************************************************************
 * TICKETS                                                                            *
 **************************************************************************************/
export const readTickets = () => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readTicketsStart());

  let url = `/users/${userId}/tickets`;

  api
    .get(url)
    .then(response => dispatch(readTicketsSuccess(response.data)))
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

export const createTicket = ticket => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(createTicketStart());

  let url = `/users/${userId}/tickets`;

  api
    .post(url, ticket)
    .then(ticket => dispatch(createTicketSuccess(ticket)))
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

export const readTicket = id => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readTicketStart());

  let url = `/users/${userId}/tickets/${id}`;

  api
    .get(url, id)
    .then(response => dispatch(readTicketSuccess(response.data)))
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

export const updateTicket = (id, ticket) => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(updateTicketStart());

  let url = `/users/${userId}/tickets/${id}`;

  api
    .put(url, ticket)
    .then(response => dispatch(updateTicketSuccess(response.data)))
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

export const deleteTicket = id => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(deleteTicketStart());

  let url = `/users/${userId}/tickets/${id}`;

  api
    .delete(url, id)
    .then(response => dispatch(deleteTicketSuccess(response.data)))
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

/**************************************************************************************
 * LOCATIONS                                                                          *
 **************************************************************************************/
export const readLocations = () => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readLocationsStart());

  let url = `/users/${userId}/locations`;

  api
    .get(url)
    .then(response => dispatch(readLocationsSuccess(response.data)))
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

export const createLocation = location => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(createLocationStart());

  let url = `/users/${userId}/locations`;

  api
    .post(url, location)
    .then(location => dispatch(createLocationSuccess(location)))
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

export const readLocation = id => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readLocationStart());

  let url = `/users/${userId}/locations/${id}`;

  api
    .get(url, id)
    .then(response => dispatch(readLocationSuccess(response.data)))
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

export const updateLocation = (id, location) => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(updateLocationStart());

  let url = `/users/${userId}/locations/${id}`;

  api
    .put(url, location)
    .then(response => dispatch(updateLocationSuccess(response.data)))
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

export const deleteLocation = id => dispatch => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(deleteLocationStart());

  let url = `/users/${userId}/locations/${id}`;

  api
    .delete(url, id)
    .then(response => dispatch(deleteLocationSuccess(response.data)))
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
