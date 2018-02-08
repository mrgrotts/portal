import api from "../../../../api";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import handleErrors from "../../../../hoc/handleErrors";

import Spinner from "../../../../components/UI/Spinner/Spinner";
import LocationForm from "./LocationForm";

import * as actions from "../../../../actions";

class LocationCreate extends Component {
  onSubmit = async location => {
    await this.props.createLocation(location);
  };

  onCancel = () => {
    this.props.history.push("/locations");
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = <LocationForm onSubmit={this.onSubmit} onCancel={this.onCancel} />;
    }

    const redirectAfterSubmit = this.props.success ? (
      <Redirect to="/locations" />
    ) : null;

    return (
      <div>
        {redirectAfterSubmit}
        <h1>Create Location Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.locations.loading,
  success: state.locations.success
});

const mapDispatchToProps = dispatch => ({
  createLocation: location => dispatch(actions.createLocation(location))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    handleErrors(LocationCreate, api)
  )
);
