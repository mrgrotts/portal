import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Map from '../';
import Marker from '../Marker/Marker';
import googleAPIComponent from '../../../../hoc/googleAPIComponent';

import Button from '../../Button/Button';

import classes from './Autocomplete.css';

export class Autocomplete extends Component {
  state = {
    place: null,
    location: null,
    position: null,
    phone: null
  };

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }

  onSearch = event => {
    event.preventDefault();
    let lat = this.state.position.lat();
    let lng = this.state.position.lng();

    this.props.updateMap(this.state.location, lat, lng, this.state.phone);
  };

  renderAutoComplete = () => {
    if (!this.props.google || !this.props.map) {
      // console.log('WAITING FOR AUTOCOMPLETE PROPS...');
      return;
    }

    const autocompleteRef = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(autocompleteRef);
    // console.log('AUTOCOMPLETE NODE FOUND', node);

    let autocomplete = new this.props.google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', this.props.map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      let location = place.address_components.reduce((loc, component) => {
        loc[component.types[0]] = component.short_name;
        return loc;
      }, {});

      // if (place.geometry.viewport) {
      //   this.props.map.fitBounds(place.geometry.viewport);
      // } else {
      //   this.props.map.setCenter(place.geometry.location);
      //   this.props.map.setZoom(10);
      // }

      this.setState({
        place,
        location,
        position: place.geometry.location,
        phone: place.formatted_phone_number
      });
    });
  };

  render() {
    return (
      <div className={classes.Autocomplete}>
        <div className={classes.AutocompleteContainer}>
          <div className={classes.AutocompleteForm}>
            <input
              className={classes.input}
              ref="autocomplete"
              type="text"
              placeholder="Enter a location"
            />
            <Button ButtonType="Success" clicked={this.onSearch}>
              Search
            </Button>
          </div>
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

  updateMap = (location, lat, lng, phone) => {
    this.setState({ showingMap: true, center: { lat, lng } });
    this.props.onSearch(location, lat, lng, phone);
    // console.log(location, lat, lng, phone);
  };

  render() {
    return (
      <div className={classes.AutocompleteWrapper}>
        <Map
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

// let location = {
//   street_number: 'short_name',
//   route: 'long_name',
//   neighborhood: 'long_name',
//   locality: 'long_name',
//   administrative_area_level_1: 'short_name',
//   administrative_area_level_2: 'short_name',
//   administrative_area_level_3: 'short_name',
//   country: 'short_name',
//   postal_code: 'short_name',
//   postal_code_suffix: 'short_name'
// };

// for (let component of place.address_components) {
//   for (let type of component.types) {
//     location[type] ? (location[type] = component[location[type]]) : null;
//   }
// }

// place.address_components.map(
//   component =>
//     (location[component.types[0]] =
//       component[location[component.types[0]]])
// );

// console.log(location);

// let location = place.address_components.reduce((address, component) => {
//   address[component.types[0]] = component.short_name;
//   return address;
// }, {});

// console.log(location);

// for (let component in place.address_components) {
//   let type = place.address_components[component].types[0];
//   let value = place.address_components[component][location[type]];
//   let keys = Object.keys(location).map(
//     key => (key === type ? value : '')
//   );
//   console.log(keys);
// }

// for (let component in place.address_components) {
//   let type = place.address_components[component].types[0];
//   // console.log('TYPES', type);
//   console.log(location[type]);

//   if (location[type]) {
//     let value = place.address_components[component][location[type]];
//     // console.log('VALUES', value);
//     location[type] = value;
//   } else {
//     location[type] = '';
//   }

//   console.log('LOCATION', location);
// }
