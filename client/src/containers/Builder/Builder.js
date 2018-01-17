import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { wrapper as googleAPIComponent } from '../../hoc/googleAPIComponent/googleAPIComponent';
import handleErrors from '../../hoc/handleErrors/handleErrors';

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

  // static propTypes = {
  //   children: PropTypes.element.isRequired
  // };

  // static contextTypes = {
  //   router: PropTypes.object
  // };

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

  // renderChildren = () => {
  //   if (!this.props.children) {
  //     return;
  //   }

  //   const sharedProps = {
  //     google: this.props.google,
  //     loaded: this.props.loaded
  //   };

  //   return React.Children.map(this.props.children, c => {
  //     return React.cloneElement(c, sharedProps, {});
  //   });
  // };

  render() {
    const style = { height: '100%', width: '100%' };

    let counter = 0;
    let position = { lat: 41.88, lng: -87.65 };
    // const c = this.renderChildren();

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
                <h4>Job Description</h4>
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
              <Map
                id={JSON.stringify(counter++)}
                google={this.props.google}
                onClick={this.onMapClicked}
                style={style}
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
    apiKey: 'AIzaSyD_xwq4iNehc3lxu1JPyDQyc_nm7D8KTRs',
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
