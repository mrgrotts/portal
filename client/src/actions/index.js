import api from '../api';
console.log(api.defaults);

export const AUTH_START = 'auth_start';
export const AUTH_SUCCESS = 'auth_success';
export const AUTH_FAIL = 'auth_fail';
export const AUTH_LOGOUT = 'auth_logout';
export const AUTH_REDIRECT_PATH = 'auth_redirect_path';

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
