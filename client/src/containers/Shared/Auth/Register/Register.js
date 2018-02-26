import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Auxiliary from '../../../../hoc/Auxiliary';
import handleErrors from '../../../../hoc/handleErrors';

import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import Spinner from '../../../../components/UI/Spinner/Spinner';

import * as actions from '../../../../actions';

import validateFields from '../../../../utils/validateFields';
class Auth extends Component {
  state = {
    registrationForm: {
      email: {
        fieldType: 'input',
        fieldConfig: { type: 'email', placeholder: 'Email' },
        value: '',
        validation: { required: true, isEmail: true },
        touched: false,
        valid: false
      },
      password: {
        fieldType: 'input',
        fieldConfig: { type: 'password', placeholder: 'Password' },
        value: '',
        validation: { required: true, minLength: 6 },
        touched: false,
        valid: false
      }
    },
    formValid: false
  };

  componentDidMount() {
    const path = '/locations/create';
    if (this.props.redirectPath !== '/locations/create') {
      this.props.authRedirectPath(path);
    }
  }

  updateField = (event, field) => {
    // 2 spreads to deeply clone state and get copies of nested properties from state
    const registrationForm = {
      ...this.state.registrationForm,
      [field]: {
        ...this.state.registrationForm[field],
        value: event.target.value,
        valid: validateFields(event.target.value, this.state.registrationForm[field].validation),
        touched: true
      }
    };

    // check form validity
    let formValid = true;

    for (let field in registrationForm) {
      formValid = registrationForm[field].valid && formValid;
      // console.log(registrationForm[field].valid, formValid, field, this.state.registrationForm[field].validation);
    }

    this.setState({ registrationForm, formValid });
  };

  authSubmit = event => {
    event.preventDefault();

    this.props.authRegister(this.state.registrationForm.email.value, this.state.registrationForm.password.value);
  };

  render() {
    let formFields = [];

    // loop over this.state.form object and push values to formFields array with config
    for (let field in this.state.registrationForm) {
      formFields.push({
        id: field,
        config: this.state.registrationForm[field]
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
          <div
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-around'
            }}>
            <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
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
            </div>
          </div>
          <Button ButtonType="Success" disabled={!this.state.formValid}>
            Register
          </Button>
        </form>
      </Auxiliary>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return <Auxiliary>{form}</Auxiliary>;
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null,
  redirectPath: state.auth.redirectPath
});

const mapDispatchToProps = dispatch => ({
  authRegister: (email, password) => dispatch(actions.authRegister(email, password)),
  authRedirectPath: path => dispatch(actions.authRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(Auth, api));
