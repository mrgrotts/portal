import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../../../hoc/Auxiliary';
import handleErrors from '../../../../hoc/handleErrors';

import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';

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

    let form = (
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
    );

    return <Auxiliary>{form}</Auxiliary>;
  }
}

const mapDispatchToProps = dispatch => ({
  authRegister: (email, password) => dispatch(actions.authRegister(email, password))
});

export default connect(null, mapDispatchToProps)(handleErrors(Auth, api));
