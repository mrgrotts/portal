import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Auxiliary from '../../hoc/Auxiliary';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../actions';

import { validateFields } from '../../utils';

import classes from './Auth.css';

class Auth extends Component {
  state = {
    user: {
      email: {
        fieldType: 'input',
        fieldConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: false
      },
      password: {
        fieldType: 'input',
        fieldConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        touched: false,
        valid: false
      }
    },
    formValid: false,
    registration: false
  };

  componentDidMount() {
    const path = '/';
    // check if we are not building and trying to go to checkout
    if (this.props.redirectPath !== '/') {
      this.props.authRedirectPath(path);
    }
  }

  updateField = (event, field) => {
    // 2 spreads to deeply clone state and get copies of nested properties from state
    const user = {
      ...this.state.user,
      [field]: {
        ...this.state.user[field],
        value: event.target.value,
        valid: validateFields(
          event.target.value,
          this.state.user[field].validation
        ),
        touched: true
      }
    };

    // check form validity
    let formValid = true;

    for (let field in user) {
      formValid = user[field].valid && formValid;
    }

    this.setState({ user, formValid });
  };

  authSubmit = event => {
    event.preventDefault();

    this.props.auth(
      this.state.user.email.value,
      this.state.user.password.value,
      this.state.registration
    );
  };

  authSwitch = () => {
    this.setState(prevState => ({
      registration: !prevState.registration
    }));
  };

  render() {
    let formFields = [];

    // loop over this.state.form object and push values to formFields array with config
    for (let field in this.state.user) {
      formFields.push({
        id: field,
        config: this.state.user[field]
      });
    }

    let error = null;

    if (this.props.error) {
      error = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.redirectPath} />;
    }

    let form = (
      <Auxiliary>
        {authRedirect}
        {error}
        <form onSubmit={this.authSubmit}>
          {formFields.map(field => (
            <Input
              key={field.id}
              update={event => this.updateField(event, field.id)}
              fieldType={field.config.fieldType}
              fieldConfig={field.config.fieldConfig}
              value={field.config.value}
              validation={field.config.validation}
              touched={field.config.touched}
              invalid={!field.config.valid}
            />
          ))}
          <Button ButtonType="Success" disabled={!this.state.formValid}>
            {this.state.registration ? 'Register' : 'Login'}
          </Button>
        </form>
        <Button ButtonType="Failure" clicked={this.authSwitch}>
          {this.state.registration
            ? 'Switch To Login'
            : 'Switch to Registration'}
        </Button>
      </Auxiliary>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.Auth}>
        <h4>Please Login</h4>
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
  auth: (email, password, registration) =>
    dispatch(actions.auth(email, password, registration)),
  authRedirectPath: path => dispatch(actions.authRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
