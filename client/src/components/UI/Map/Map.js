import React, { Component } from 'react';

import classes from './Map.css';

let map;

class Map extends Component {
  // https://developers.google.com/maps/documentation/javascript/places#place_search_requests
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    map = new window.google.maps.Map(
      document.getElementById(`map-${this.props.id}`),
      {
        center: { lat: this.props.latitude, lng: this.props.longitude },
        zoom: 10,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        },
        scrollwheel: false,
        streetViewControl: false
      }
    );
  }

  render() {
    return <div className={classes.Map} id={`map-${this.props.id}`} />;
  }
}

export default Map;
