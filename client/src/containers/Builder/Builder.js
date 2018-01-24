import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { wrapper as googleAPIComponent } from '../../hoc/googleAPIComponent';
import handleErrors from '../../hoc/handleErrors';

import AutocompleteWrapper from '../../components/UI/Maps/Autocomplete/Autocomplete';
import Map from '../../components/UI/Maps';
import InfoWindow from '../../components/UI/Maps/InfoWindow/InfoWindow';
import Marker from '../../components/UI/Maps/Marker/Marker';

import * as actions from '../../actions';

import classes from './Builder.css';

class Builder extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMapClick = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMarkerClick = (props, marker, e) => {
    console.log('clicked');
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  };

  render() {
    let counter = 0;
    let position = { lat: 41.88, lng: -87.65 };

    return (
      <div className={classes.Builder}>
        <div className={classes.title}>
          <h1>Builder Component</h1>
        </div>
        <div className={classes.container}>
          <div className={classes.columnTwo}>
            <div className={classes.widget}>
              <div>
                <h4>Job Number</h4>
              </div>
              <div>
                <h4>Category</h4>
              </div>
            </div>

            <div className={classes.widget}>
              <div>
                <AutocompleteWrapper />
              </div>
            </div>
          </div>

          <div className={classes.columnTwo}>
            <div className={classes.widget}>
              <div>
                <h4>Status</h4>
              </div>
              <div>
                <h4>Requested Date</h4>
              </div>
            </div>

            <div className={classes.widget}>
              <div
                style={{
                  height: '300px',
                  width: '300px'
                }}
              >
                <Map
                  center={position}
                  id={JSON.stringify(counter++)}
                  google={this.props.google}
                  onClick={this.onMapClicked}
                  zoom={10}
                >
                  <Marker
                    name={'Test Marker'}
                    onClick={this.onMarkerClick}
                    position={position}
                  />
                  <InfoWindow
                    style={{ zIndex: '100' }}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}
                  >
                    <div>
                      <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                  </InfoWindow>
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  authRedirectPath: path => dispatch(actions.authRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  googleAPIComponent({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })(handleErrors(Builder, api))
);

// <Marker
//   name={'Test Marker'}
//   onClick={this.onMarkerClick}
//   positioniton={positionition}
//   icon={{
//     url: '/path/to/custom_icon.png',
//     anchor: new google.maps.Point(32, 32),
//     scaledSize: new google.maps.Size(64, 64)
//   }}
// />
