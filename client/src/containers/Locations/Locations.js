import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import handleErrors from '../../hoc/handleErrors/handleErrors';

import Spinner from '../../components/UI/Spinner/Spinner';
import Location from '../../components/Location/Location';

import * as actions from '../../actions';

import classes from './Locations.css';

class Locations extends Component {
  async componentDidMount() {
    await this.props.readLocations();
  }

  updateLocation = async location => await this.props.updateLocation(location);

  deleteLocation = async id => await this.props.deleteLocation(id);

  render() {
    let locations = <Spinner />;

    if (!this.props.loading) {
      locations = this.props.locations.map(location => (
        <div
          key={location._id}
          style={{
            width: '100%',
            backgroundColor: 'white'
          }}
        >
          <Location
            {...location}
            update={this.updateLocation.bind(this, location)}
            delete={this.deleteLocation.bind(this, location._id)}
          />
        </div>
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
  updateLocation: location => dispatch(actions.updateLocation(location)),
  deleteLocation: id => dispatch(actions.deleteLocation(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Locations, api)
);
