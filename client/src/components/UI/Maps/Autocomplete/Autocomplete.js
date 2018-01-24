import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Map from '../';
import Marker from '../Marker/Marker';
import googleAPIComponent from '../../../../hoc/googleAPIComponent';

import classes from './Autocomplete.css';

export class Autocomplete extends Component {
  state = {
    place: null,
    position: null
  };

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }

  onSubmit = event => {
    event.preventDefault();

    let lat = this.state.position.lat();
    let lng = this.state.position.lng();

    this.props.updateMap(lat, lng);
    console.log('[LAT LNG FROM onSubmit]', lat, lng);
  };

  renderAutoComplete = () => {
    if (!this.props.google || !this.props.map) {
      console.log('no props');
      return;
    }

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    console.log('NODE', node);

    let autocomplete = new this.props.google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', this.props.map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      // if (place.geometry.viewport) {
      //   this.props.map.fitBounds(place.geometry.viewport);
      // } else {
      //   this.props.map.setCenter(place.geometry.location);
      //   this.props.map.setZoom(10);
      // }

      this.setState({
        place,
        position: place.geometry.location
      });
    });
  };

  render() {
    return (
      <div className={classes.Autocomplete}>
        <div className={classes.AutocompleteContainer}>
          <form className={classes.AutocompleteForm} onSubmit={this.onSubmit}>
            <input
              className={classes.input}
              ref="autocomplete"
              type="text"
              placeholder="Enter a location"
            />
            <input className={classes.button} type="submit" value="Search" />
          </form>
        </div>
        <div>
          <div>Lat: {this.state.position && this.state.position.lat()}</div>
          <div>Lng: {this.state.position && this.state.position.lng()}</div>
        </div>
      </div>
    );
  }
}

class AutocompleteWrapper extends Component {
  state = {
    center: {
      lat: 41.88,
      lng: -87.65
    },
    showingMap: false
  };

  updateMap = (lat, lng) => {
    console.log('[LAT LNG FROM updateMap]', lat, lng);
    this.setState({ showingMap: true, center: { lat, lng } });
  };

  render() {
    return (
      <div className={classes.AutocompleteWrapper}>
        <Map
          {...this.props}
          google={this.props.google}
          center={this.state.center}
          className={classes.AutocompleteMap}
          visible={this.state.showingMap}
          zoom={10}
        >
          <Marker name={'Search Results'} position={this.state.center} />
          <Autocomplete {...this.props} updateMap={this.updateMap} />
        </Map>
      </div>
    );
  }
}

export default googleAPIComponent({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  libraries: ['places']
})(AutocompleteWrapper);
