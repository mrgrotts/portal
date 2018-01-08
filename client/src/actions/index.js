import api from '../api';
console.log(api.defaults);

export const AUTH_START = 'auth_start';
export const AUTH_SUCCESS = 'auth_success';
export const AUTH_FAIL = 'auth_fail';
export const AUTH_LOGOUT = 'auth_logout';
export const AUTH_REDIRECT_PATH = 'auth_redirect_path';

export const CREATE_TICKET = 'create_ticket';
export const CREATE_TICKET_START = 'create_ticket_start';
export const CREATE_TICKET_SUCCESS = 'create_ticket_success';
export const CREATE_TICKET_FAIL = 'create_ticket_fail';

export const READ_TICKETS_START = 'read_tickets_start';
export const READ_TICKETS_SUCCESS = 'read_tickets_success';
export const READ_TICKETS_FAIL = 'read_tickets_fail';

export const UPDATE_TICKET_START = 'update_ticket_start';
export const UPDATE_TICKET_SUCCESS = 'update_ticket_success';
export const UPDATE_TICKET_FAIL = 'update_ticket_fail';

export const DELETE_TICKET_START = 'delete_ticket_start';
export const DELETE_TICKET_SUCCESS = 'delete_ticket_success';
export const DELETE_TICKET_FAIL = 'delete_ticket_fail';

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
    .post(url, { email, password })
    .then(response => {
      // create new date using the current date + expiration time in seconds
      const expiration = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      localStorage.setItem('user', response.data.userId);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', expiration);
      // localStorage.setItem('refreshToken', response.data.refreshToken);

      dispatch(authSuccess(response.data.token, response.data.userId));
      dispatch(authTimeout(response.data.expiresIn));
      // dispatch(readTickets(response.data.userId));
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
  // localStorage.removeItem('refreshToken');

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
  }
};

/**************************************************************************************
 * TICKETS                                                                            *
 **************************************************************************************/
export const createTicket = ticket => dispatch => {
  const id = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(createTicketStart());

  let url = `/users/${id}/tickets`;

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

export const readTickets = () => dispatch => {
  const id = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(readTicketsStart());

  let url = `/users/${id}/tickets`;

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

export const updateTicket = ticket => dispatch => {
  const id = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(updateTicketStart());

  let url = `/users/${id}/tickets/${ticket._id}`;

  api.put(url, ticket).then(ticket =>
    dispatch(updateTicketSuccess(ticket)).catch(error => {
      console.log(error);
      dispatch(updateTicketFail(error));
    })
  );
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

export const deleteTicket = ticket => dispatch => {
  const id = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  dispatch(deleteTicketStart());

  let url = `/users/${id}/tickets/${ticket._id}`;

  api.delete(url, ticket).then(ticket =>
    dispatch(deleteTicketSuccess(ticket)).catch(error => {
      console.log(error);
      dispatch(deleteTicketFail(error));
    })
  );
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

// userId: null,
// status: null,
// category: null,
// location: null,
// description: null,
// media: [],
// comments: [],
// assignedTo: null,
// requestedDate: null,
// scheduledFor: null,
// partPurchasedDate: null,
// partArrivedDate: null,
// workCompleted: null,
// hoursSpent: null,
// hourlyRate: null,
// completedDate: null,
// requestedDeletion: false,
