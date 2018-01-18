import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import handleErrors from '../../hoc/handleErrors';

import Spinner from '../../components/UI/Spinner/Spinner';
import Location from '../../components/Location/Location';

import * as actions from '../../actions';

import classes from './Locations.css';

class Locations extends Component {
  async componentDidMount() {
    await this.props.readLocations();
  }

  updateLocation = async location => {
    await this.props.updateLocation(this.props.location._id, location);
    this.props.history.push('/locations');
  };

  deleteLocation = async id => await this.props.deleteLocation(id);

  render() {
    let locations = <Spinner />;

    if (!this.props.loading) {
      locations = this.props.locations.map(location => (
        <Location
          key={location._id}
          {...location}
          update={this.updateLocation.bind(this, location)}
          delete={this.deleteLocation.bind(this, location._id)}
        />
      ));
    }

    return (
      <div className={classes.Locations}>
        <h1>You Have {locations.length} Locations</h1>
        {locations}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.locations,
  loading: state.locations.loading,
  token: state.auth.token,
  id: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  readLocations: () => dispatch(actions.readLocations()),
  updateLocation: (id, location) =>
    dispatch(actions.updateLocation(id, location)),
  deleteLocation: id => dispatch(actions.deleteLocation(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Locations, api)
);
