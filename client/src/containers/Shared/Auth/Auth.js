import api from '../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Login from './Login/Login';
import Register from './Register/Register';

import Auxiliary from '../../../hoc/Auxiliary';
import handleErrors from '../../../hoc/handleErrors';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../actions';

import classes from './Auth.css';

class Auth extends Component {
  state = {
    registration: false
  };

  componentDidMount() {
    const path = '/';
    if (this.props.redirectPath !== '/') {
      this.props.authRedirectPath(path);
    }
  }

  authSwitch = () => {
    this.setState(prevState => ({
      registration: !prevState.registration
    }));
  };

  render() {
    let error = null;

    if (this.props.error) {
      error = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.redirectPath} />;
    }

    let authForm = this.state.registration ? <Register /> : <Login />;

    let form = (
      <Auxiliary>
        {authRedirect}
        {error}
        {authForm}
        <Button ButtonType="Failure" clicked={this.authSwitch}>
          {this.state.registration ? 'Switch To Login' : 'Switch to Registration'}
        </Button>
      </Auxiliary>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.Auth}>
        <h4>{this.state.registration ? 'Register' : 'Login'}</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null,
  redirectPath: state.auth.redirectPath
});

const mapDispatchToProps = dispatch => ({
  authRedirectPath: path => dispatch(actions.authRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(Auth, api));
