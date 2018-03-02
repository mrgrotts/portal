import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import handleErrors from '../../../../hoc/handleErrors';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import LocationForm from './LocationForm';

import * as actions from '../../../../actions';

class LocationUpdate extends Component {
  updateLocation = async location => {
    await this.props.updateLocation(this.props.location._id, location);
  };

  onCancel = () => {
    this.props.history.push('/locations');
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <LocationForm
          onSubmit={this.updateLocation}
          onCancel={this.onCancel}
          location={this.props.location}
        />
      );
    }

    const redirectAfterSubmit = this.props.success ? (
      <Redirect to="/locations" />
    ) : null;

    return (
      <div style={{ height: '100%', width: '100%' }}>
        {redirectAfterSubmit}
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Update Location Form
        </h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  location: state.locations.locations.find(
    location => location._id === props.match.params.locationId
  ),
  userId: state.auth.userId,
  token: state.auth.token,
  loading: state.locations.loading,
  success: state.locations.success
});

const mapDispatchToProps = dispatch => ({
  updateLocation: (id, location) =>
    dispatch(actions.updateLocation(id, location))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    handleErrors(LocationUpdate, api)
  )
);
