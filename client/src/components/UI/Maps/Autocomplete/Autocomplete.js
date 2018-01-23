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
    console.log(this.state);
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

      if (place.geometry.viewport) {
        this.props.map.fitBounds(place.geometry.viewport);
      } else {
        this.props.map.setCenter(place.geometry.location);
        this.props.map.setZoom(17);
      }

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
            <input className={classes.button} type="submit" value="Go" />
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
  render() {
    return (
      <div
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        <Map google={this.props.google} className={'map'} visible={false}>
          <Autocomplete {...this.props} />
        </Map>
      </div>
    );
  }
}

export default googleAPIComponent({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  libraries: ['places']
})(AutocompleteWrapper);
