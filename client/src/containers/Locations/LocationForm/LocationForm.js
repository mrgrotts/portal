import api from '../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Auxiliary from '../../../hoc/Auxiliary';
import handleErrors from '../../../hoc/handleErrors';

import AutocompleteWrapper from '../../../components/UI/Maps/Autocomplete/Autocomplete';
import Button from '../../../components/UI/Button/Button';
// import Input from '../../components/UI/Input/Input';

// import validateFields from '../../utils/validateFields';

import * as actions from '../../../actions';

import classes from './LocationForm.css';

class LocationForm extends Component {
  static defaultProps = {
    onSearch() {},
    onCancel() {}
  };

  state = {
    name: this.props.location ? this.props.location.name : '',
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
    longitude: this.props.location ? this.props.location.longitude : '',
    phone: this.props.location ? this.props.location.phone : '',
    createdAt: this.props.ticket
      ? moment(this.props.ticket.createdAt)
      : moment(),
    updatedAt: this.props.ticket
      ? moment(this.props.ticket.updatedAt)
      : moment()
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSearch = (location, lat, lng, phone) => {
    return this.setState({
      streetNumber: location.street_number,
      route: location.route,
      addressOne: `${location.street_number} ${location.route}`,
      neighborhood: location.neighborhood,
      city: location.locality,
      township: location.administrative_area_level_3,
      county: location.administrative_area_level_2,
      state: location.administrative_area_level_1,
      zipcode: location.postal_code,
      zipcodeSuffix: location.postal_code_suffix,
      country: location.country,
      latitude: lat,
      longitude: lng,
      phone: phone !== undefined ? phone : this.state.phone
    });
  };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    return this.props.onSubmit({
      name: this.state.name,
      streetNumber: this.state.streetNumber,
      route: this.state.route,
      addressOne: this.state.addressOne,
      addressTwo: this.state.addressTwo,
      neighborhood: this.state.neighborhood,
      city: this.state.city,
      township: this.state.township,
      county: this.state.county,
      state: this.state.state,
      zipcode: this.state.zipcode,
      zipcodeSuffix: this.state.zipcodeSuffix,
      country: this.state.country,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      phone: this.state.phone
    });
  };

  onCancel = event => {
    this.props.onCancel();

    this.setState({
      name: this.props.location ? this.props.location.name : '',
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
      zipcodeSuffix: this.props.location
        ? this.props.location.zipcodeSuffix
        : '',
      country: this.props.location ? this.props.location.country : '',
      latitude: this.props.location ? this.props.location.latitude : '',
      longitude: this.props.location ? this.props.location.longitude : '',
      phone: this.props.location ? this.props.location.phone : '',
      createdAt: this.props.ticket
        ? moment(this.props.ticket.createdAt)
        : moment(),
      updatedAt: this.props.ticket
        ? moment(this.props.ticket.updatedAt)
        : moment()
    });
  };

  render() {
    return (
      <Auxiliary>
        <form>
          <div style={{ marginTop: '1.5rem' }}>
            <label htmlFor="name">
              Name
              <input
                id="name"
                className={classes.LocationFormControl}
                name="name"
                onChange={this.handleChange}
                type="text"
                value={this.state.name}
              />
            </label>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <label htmlFor="phone">
              Phone
              <input
                id="phone"
                className={classes.LocationFormControl}
                name="phone"
                onChange={this.handleChange}
                type="text"
                value={this.state.phone}
              />
            </label>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <AutocompleteWrapper onSearch={this.onSearch} />
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <label htmlFor="address-one">
              Address One
              <input
                id="address-one"
                className={classes.LocationFormControl}
                name="addressOne"
                onChange={this.handleChange}
                type="text"
                value={this.state.addressOne}
              />
            </label>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <label htmlFor="address-two">
              Address Two
              <input
                id="address-two"
                className={classes.LocationFormControl}
                name="addressTwo"
                onChange={this.handleChange}
                type="text"
                value={this.state.addressTwo}
              />
            </label>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <label htmlFor="city">
              City
              <input
                id="city"
                className={classes.LocationFormControl}
                name="city"
                onChange={this.handleChange}
                type="text"
                value={this.state.city}
              />
            </label>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <label htmlFor="state">
              State
              <input
                id="state"
                className={classes.LocationFormControl}
                name="state"
                onChange={this.handleChange}
                type="text"
                value={this.state.state}
              />
            </label>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <label htmlFor="zipcode">
              Zipcode
              <input
                id="zipcode"
                className={classes.LocationFormControl}
                name="zipcode"
                onChange={this.handleChange}
                type="text"
                value={this.state.zipcode}
              />
            </label>
          </div>
          <Button ButtonType="Success" clicked={this.onSubmit} type="button">
            Submit
          </Button>
          <Button ButtonType="Failure" clicked={this.onCancel} type="button">
            Cancel
          </Button>
        </form>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.locations,
  loading: state.locations.loading
});

const mapDispatchToProps = dispatch => ({
  readLocations: () => dispatch(actions.readLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(LocationForm, api)
);
