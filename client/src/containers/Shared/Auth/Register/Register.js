import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Auxiliary from '../../../../hoc/Auxiliary';
import handleErrors from '../../../../hoc/handleErrors';

import AutocompleteWrapper from '../../../../components/UI/Maps/Autocomplete/Autocomplete';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import Spinner from '../../../../components/UI/Spinner/Spinner';

import * as actions from '../../../../actions';

import validateFields from '../../../../utils/validateFields';

class Auth extends Component {
  static defaultProps = {
    onSearch() {}
  };

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
      },
      name: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Company Name' },
        value: '',
        validation: { required: true },
        touched: false,
        valid: false
      },
      phone: {
        fieldType: 'input',
        fieldConfig: { type: 'tel', placeholder: 'Phone Number' },
        value: '',
        validation: { required: false, isPhoneNumber: true },
        touched: false,
        valid: true
      },
      streetNumber: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Street Number' },
        value: '',
        validation: { required: false, isNumeric: true },
        touched: false,
        valid: true
      },
      route: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Route' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: true
      },
      addressOne: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Address One' },
        value: '',
        validation: { required: true },
        touched: false,
        valid: false
      },
      addressTwo: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Address Two' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: true
      },
      neighborhood: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Neighborhood' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: true
      },
      city: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'City' },
        value: '',
        validation: { required: true },
        touched: false,
        valid: false
      },
      township: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Township' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: true
      },
      county: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'County' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: true
      },
      state: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'State' },
        value: '',
        validation: { required: true, minLength: 2, maxLength: 2 },
        touched: false,
        valid: false
      },
      zipcode: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Zip Code' },
        value: '',
        validation: { required: true, minLength: 5, maxLength: 5, isNumeric: true },
        touched: false,
        valid: false
      },
      zipcodeSuffix: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Zip Code Suffix' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: true
      },
      country: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Country' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: true
      },
      latitude: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Latitude' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: true
      },
      longitude: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Longitude' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: true
      }
    },
    formValid: false
  };

  componentDidMount() {
    const path = '/';
    if (this.props.redirectPath !== '/') {
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

  onSearch = (location, lat, lng, phone) => {
    // console.log(location, lat, lng, phone);

    let autocompleteResult = {
      phone: phone !== undefined ? phone : this.state.registrationForm.phone.value,
      streetNumber: location.street_number !== undefined ? location.street_number : this.state.registrationForm.streetNumber.value,
      route: location.route !== undefined ? location.route : this.state.registrationForm.route.value,
      addressOne:
        location.route !== undefined && location.street_number !== undefined
          ? `${location.street_number} ${location.route}`
          : this.state.registrationForm.addressOne.value,
      neighborhood: location.neighborhood !== undefined ? location.neighborhood : this.state.registrationForm.neighborhood.value,
      city: location.locality !== undefined ? location.locality : this.state.registrationForm.city.value,
      township:
        location.administrative_area_level_3 !== undefined ? location.administrative_area_level_3 : this.state.registrationForm.township.value,
      county: location.administrative_area_level_2 !== undefined ? location.administrative_area_level_2 : this.state.registrationForm.county.value,
      state: location.administrative_area_level_1 !== undefined ? location.administrative_area_level_1 : this.state.registrationForm.state.value,
      zipcode: location.postal_code !== undefined ? location.postal_code : this.state.registrationForm.zipcode.value,
      zipcodeSuffix: location.postal_code_suffix !== undefined ? location.postal_code_suffix : this.state.registrationForm.zipcodeSuffix.value,
      country: location.country !== undefined ? location.country : this.state.registrationForm.country.value,
      latitude: lat !== undefined ? lat : this.state.registrationForm.latitude.value,
      longitude: lng !== undefined ? lng : this.state.registrationForm.longitude.value
    };

    // console.log('[AUTOCOMPLETE RESULT]', autocompleteResult);

    let registrationForm = { ...this.state.registrationForm };
    for (let field in autocompleteResult) {
      // console.log('[FIELD]', field);
      // console.log('[AUTOCOMPLETE FIELD]', autocompleteResult[field]);

      registrationForm[field] = {
        ...this.state.registrationForm[field],
        value: autocompleteResult[field],
        valid: validateFields(autocompleteResult[field], this.state.registrationForm[field].validation),
        touched: true
      };

      // console.log('[REGISTRATION FORM]', registrationForm);
    }

    let formValid = true;

    for (let field in registrationForm) {
      formValid = registrationForm[field].valid && formValid;
      // console.log(registrationForm[field].valid, formValid, field, this.state.registrationForm[field].validation);
    }

    return this.setState({ registrationForm, formValid });
  };

  authSubmit = event => {
    event.preventDefault();
    let company = {
      name: this.state.registrationForm.name.value,
      phone: this.state.registrationForm.phone.value,
      streetNumber: this.state.registrationForm.streetNumber.value,
      route: this.state.registrationForm.route.value,
      addressOne: this.state.registrationForm.addressOne.value,
      addressTwo: this.state.registrationForm.addressTwo.value,
      neighborhood: this.state.registrationForm.neighborhood.value,
      city: this.state.registrationForm.city.value,
      township: this.state.registrationForm.township.value,
      county: this.state.registrationForm.county.value,
      state: this.state.registrationForm.state.value,
      zipcode: this.state.registrationForm.zipcode.value,
      zipcodeSuffix: this.state.registrationForm.zipcodeSuffix.value,
      country: this.state.registrationForm.country.value,
      latitude: this.state.registrationForm.latitude.value,
      longitude: this.state.registrationForm.longitude.value
    };

    this.props.authRegister(this.state.registrationForm.email.value, this.state.registrationForm.password.value, company);
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
          <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around' }}>
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

            <div style={{ marginTop: '5rem' }}>
              <AutocompleteWrapper onSearch={this.onSearch} />
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
  authRegister: (email, password, company) => dispatch(actions.authRegister(email, password, company)),
  authRedirectPath: path => dispatch(actions.authRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(Auth, api));
