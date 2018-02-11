import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Auxiliary from '../../../../hoc/Auxiliary';
import handleErrors from '../../../../hoc/handleErrors';

import AutocompleteWrapper from '../../../../components/UI/Maps/Autocomplete/Autocomplete';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import Spinner from '../../../../components/UI/Spinner/Spinner';

import { toTitleCase } from '../../../../utils/transformString';
import validateFields from '../../../../utils/validateFields';

import * as actions from '../../../../actions';

import classes from './LocationForm.css';

class LocationForm extends Component {
  static defaultProps = {
    onSearch() {},
    onSubmit() {},
    onCancel() {}
  };

  state = {
    locationForm: {
      name: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Location Name', ref: 'name' },
        value: this.props.location ? this.props.location.name : '',
        validation: { required: true },
        touched: false,
        valid: this.props.location ? true : false
      },
      phone: {
        fieldType: 'input',
        fieldConfig: { type: 'tel', placeholder: 'Phone Number', ref: 'phone' },
        value: this.props.location ? this.props.location.phone : '',
        validation: { required: false, isPhoneNumber: true },
        touched: false,
        valid: this.props.location ? true : false
      },
      streetNumber: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Street Number', ref: 'streetNumber' },
        value: this.props.location ? this.props.location.streetNumber : '',
        validation: { required: false, isNumeric: true },
        touched: false,
        valid: this.props.location ? true : false
      },
      route: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Route', ref: 'route' },
        value: this.props.location ? this.props.location.route : '',
        validation: { required: false },
        touched: false,
        valid: this.props.location ? true : false
      },
      addressOne: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Address One', ref: 'addressOne' },
        value: this.props.location ? this.props.location.addressOne : '',
        validation: { required: true },
        touched: false,
        valid: this.props.location ? true : false
      },
      addressTwo: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Address Two', ref: 'addressTwo' },
        value: this.props.location ? this.props.location.addressTwo : '',
        validation: { required: false },
        touched: false,
        valid: this.props.location ? true : false
      },
      neighborhood: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Neighborhood', ref: 'neighborhood' },
        value: this.props.location ? this.props.location.neighborhood : '',
        validation: { required: false },
        touched: false,
        valid: this.props.location ? true : false
      },
      city: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'City', ref: 'city' },
        value: this.props.location ? this.props.location.city : '',
        validation: { required: true },
        touched: false,
        valid: this.props.location ? true : false
      },
      township: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Township', ref: 'township' },
        value: this.props.location ? this.props.location.township : '',
        validation: { required: false },
        touched: false,
        valid: this.props.location ? true : false
      },
      county: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'County', ref: 'county' },
        value: this.props.location ? this.props.location.county : '',
        validation: { required: false },
        touched: false,
        valid: this.props.location ? true : false
      },
      state: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'State', ref: 'state' },
        value: this.props.location ? this.props.location.state : '',
        validation: { required: true, minLength: 2, maxLength: 2 },
        touched: false,
        valid: this.props.location ? true : false
      },
      zipcode: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Zip Code', ref: 'zipcode' },
        value: this.props.location ? this.props.location.zipcode : '',
        validation: { required: true, minLength: 5, maxLength: 5, isNumeric: true },
        touched: false,
        valid: this.props.location ? true : false
      },
      zipcodeSuffix: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Zip Code Suffix', ref: 'zipcodeSuffix' },
        value: this.props.location ? this.props.location.zipcodeSuffix : '',
        validation: { required: false, isNumeric: true },
        touched: false,
        valid: this.props.location ? true : false
      },
      country: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Country', ref: 'country' },
        value: this.props.location ? this.props.location.country : '',
        validation: { required: false },
        touched: false,
        valid: this.props.location ? true : false
      },
      latitude: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Latitude', ref: 'latitude' },
        value: this.props.location ? this.props.location.latitude : '',
        validation: { required: false, isNumeric: true },
        touched: false,
        valid: this.props.location ? true : false
      },
      longitude: {
        fieldType: 'input',
        fieldConfig: { type: 'hidden', placeholder: 'Longitude', ref: 'longitude' },
        value: this.props.location ? this.props.location.longitude : '',
        validation: { required: false, isNumeric: true },
        touched: false,
        valid: this.props.location ? true : false
      }
    },
    formValid: false,
    createdAt: this.props.work ? moment(this.props.work.createdAt) : moment(),
    updatedAt: this.props.work ? moment(this.props.work.updatedAt) : moment()
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  updateField = (event, field) => {
    // 2 spreads to deeply clone state and get copies of nested properties from state
    const locationForm = {
      ...this.state.locationForm,
      [field]: {
        ...this.state.locationForm[field],
        value: event.target.value,
        valid: validateFields(event.target.value, this.state.locationForm[field].validation),
        touched: true
      }
    };

    // check form validity
    let formValid = true;

    for (let field in locationForm) {
      formValid = locationForm[field].valid && formValid;
    }

    return this.setState({ locationForm, formValid });
  };

  onSearch = (location, lat, lng, phone) => {
    // console.log(location, lat, lng, phone);

    let autocompleteResult = {
      phone: phone !== undefined ? phone : this.state.locationForm.phone.value,
      streetNumber: location.street_number !== undefined ? location.street_number : this.state.locationForm.streetNumber.value,
      route: location.route !== undefined ? location.route : this.state.locationForm.route.value,
      addressOne:
        location.route !== undefined && location.street_number !== undefined
          ? `${location.street_number} ${location.route}`
          : this.state.locationForm.addressOne.value,
      neighborhood: location.neighborhood !== undefined ? location.neighborhood : this.state.locationForm.neighborhood.value,
      city: location.locality !== undefined ? location.locality : this.state.locationForm.city.value,
      township: location.administrative_area_level_3 !== undefined ? location.administrative_area_level_3 : this.state.locationForm.township.value,
      county: location.administrative_area_level_2 !== undefined ? location.administrative_area_level_2 : this.state.locationForm.county.value,
      state: location.administrative_area_level_1 !== undefined ? location.administrative_area_level_1 : this.state.locationForm.state.value,
      zipcode: location.postal_code !== undefined ? location.postal_code : this.state.locationForm.zipcode.value,
      zipcodeSuffix: location.postal_code_suffix !== undefined ? location.postal_code_suffix : this.state.locationForm.zipcodeSuffix.value,
      country: location.country !== undefined ? location.country : this.state.locationForm.country.value,
      latitude: lat !== undefined ? lat : this.state.locationForm.latitude.value,
      longitude: lng !== undefined ? lng : this.state.locationForm.longitude.value
    };

    // console.log('[AUTOCOMPLETE RESULT]', autocompleteResult);

    let locationForm = { ...this.state.locationForm };
    for (let field in autocompleteResult) {
      // console.log('[FIELD]', field);
      // console.log('[AUTOCOMPLETE FIELD]', autocompleteResult[field]);

      locationForm[field] = {
        ...this.state.locationForm[field],
        value: autocompleteResult[field],
        valid: validateFields(autocompleteResult[field], this.state.locationForm[field].validation),
        touched: true
      };

      // console.log('[LOCATION FORM]', locationForm);
    }

    // check form validity
    let formValid = true;

    for (let field in locationForm) {
      formValid = locationForm[field].valid && formValid;
    }

    return this.setState({ locationForm, formValid });
  };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    return this.props.onSubmit({
      name: this.state.locationForm.name.value,
      phone: this.state.locationForm.phone.value,
      streetNumber: this.state.locationForm.streetNumber.value,
      route: this.state.locationForm.route.value,
      addressOne: this.state.locationForm.addressOne.value,
      addressTwo: this.state.locationForm.addressTwo.value,
      neighborhood: this.state.locationForm.neighborhood.value,
      city: this.state.locationForm.city.value,
      township: this.state.locationForm.township.value,
      county: this.state.locationForm.county.value,
      state: this.state.locationForm.state.value,
      zipcode: this.state.locationForm.zipcode.value,
      zipcodeSuffix: this.state.locationForm.zipcodeSuffix.value,
      country: this.state.locationForm.country.value,
      latitude: this.state.locationForm.latitude.value,
      longitude: this.state.locationForm.longitude.value
    });
  };

  onCancel = event => {
    this.props.onCancel();

    this.setState({
      locationForm: {
        name: this.props.location ? this.props.location.name : '',
        phone: this.props.location ? this.props.location.phone : '',
        streetNumber: this.props.location ? this.props.location.streetNumber : '',
        route: this.props.location ? this.props.location.route : '',
        addressOne: this.props.location ? this.props.location.addressOne : '',
        addressTwo: this.props.location ? this.props.location.addressTwo : '',
        neighborhood: this.props.location ? this.props.location.neighborhood : '',
        city: this.props.location ? this.props.location.city : '',
        township: this.props.location ? this.props.location.township : '',
        county: this.props.location ? this.props.location.county : '',
        state: this.props.location ? this.props.location.state : '',
        zipcode: this.props.location ? this.props.location.zipcode : '',
        zipcodeSuffix: this.props.location ? this.props.location.zipcodeSuffix : '',
        country: this.props.location ? this.props.location.country : '',
        latitude: this.props.location ? this.props.location.latitude : '',
        longitude: this.props.location ? this.props.location.longitude : ''
      },
      createdAt: this.props.work ? moment(this.props.work.createdAt) : moment(),
      updatedAt: this.props.work ? moment(this.props.work.updatedAt) : moment()
    });
  };

  render() {
    // console.log(this.state);
    // console.log(this.props.work);
    let locationFields = [];
    for (let key in this.state.locationForm) {
      locationFields.push({
        id: key,
        config: this.state.locationForm[key]
      });
    }

    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <form className={classes.LocationForm}>
          <div style={{ marginTop: '3rem' }}>
            <AutocompleteWrapper onSearch={this.onSearch} />
          </div>
          {locationFields.map(field => (
            <div key={field.id}>
              <Input
                key={field.id}
                label={toTitleCase(field.id)}
                name={field.id}
                update={event => this.updateField(event, field.id)}
                fieldType={field.config.fieldType}
                fieldConfig={field.config.fieldConfig}
                value={field.config.value}
                validation={field.config.validation}
                touched={field.config.touched}
                invalid={!field.config.valid}
              />
            </div>
          ))}
          <Button ButtonType="Success" clicked={this.onSubmit} type="button">
            Submit
          </Button>
          <Button ButtonType="Failure" clicked={this.onCancel} type="button">
            Cancel
          </Button>
        </form>
      );
    }

    return <Auxiliary>{form}</Auxiliary>;
  }
}

const mapStateToProps = state => ({
  locations: state.locations.locations,
  loading: state.locations.loading
});

const mapDispatchToProps = dispatch => ({
  readLocations: () => dispatch(actions.readLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(LocationForm, api));
