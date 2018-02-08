import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { wrapper as googleAPIComponent } from '../../../../hoc/googleAPIComponent';

import Button from '../../../../components/UI/Button/Button';
import Map from '../../../../components/UI/Maps';
import Marker from '../../../../components/UI/Maps/Marker/Marker';
import InfoWindow from '../../../../components/UI/Maps/InfoWindow/InfoWindow';

import classes from './Location.css';

class Location extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMapClick = () => {
    // console.log('map click');
    if (this.state.showingInfoWindow) {
      return this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMarkerClick = (props, marker, e) => {
    // console.log('marker click');
    return this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onInfoWindowClose = () => {
    // console.log('infowindow close');
    return this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  };

  render() {
    const style = { height: '100%', width: '100%' };

    let workList;
    this.props.work
      ? (workList = (
          <div>
            <h4>{this.props.work.length} WorkList</h4>
            {this.props.work.map(work => (
              <div key={work._id}>
                <p>
                  <Link to={`/work/${work._id}`}>
                    <strong>{work._id}: </strong>
                  </Link>
                  {work.description}
                </p>
              </div>
            ))}
          </div>
        ))
      : (workList = (
          <div>
            <h4>No WorkList</h4>
            <p>No WorkList for this Location</p>
          </div>
        ));

    return (
      <div className={classes.Location}>
        <div className={classes.LocationMap}>
          <Map
            id={this.props._id}
            center={{ lat: this.props.latitude, lng: this.props.longitude }}
            google={this.props.google}
            onClick={this.onMapClicked}
            style={style}
            zoom={10}
          >
            <Marker
              name={this.props.name}
              onClick={this.onMarkerClick}
              position={{ lat: this.props.latitude, lng: this.props.longitude }}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onInfoWindowClose}
            >
              <div>
                <p style={{ color: 'black', fontWeight: '600' }}>
                  {this.state.selectedPlace.name}
                </p>
                <p style={{ color: 'black' }}>{this.props.addressOne}</p>
                <p style={{ color: 'black' }}>{this.props.addressTwo}</p>
                <p style={{ color: 'black' }}>
                  {this.props.city}, {this.props.state} {this.props.zipcode}
                </p>
              </div>
            </InfoWindow>
          </Map>
        </div>
        <h1>
          <strong>{this.props.name}</strong>
        </h1>
        <h4>{this.props._id}</h4>
        <p>
          <a href={`tel:${this.props.phone}`}>{this.props.phone}</a>
        </p>
        <p>{this.props.addressOne}</p>
        <p>{this.props.addressTwo}</p>
        <p>
          {this.props.city}, {this.props.state} {this.props.zipcode}
        </p>
        <p>
          {this.props.latitude}, {this.props.longitude}
        </p>
        <hr style={{ margin: '5px 0' }} />
        {workList}
        <p>Created By: {this.props.userId.email}</p>
        <p>Created At: {this.props.createdAt}</p>
        <p>Updated At: {this.props.updatedAt}</p>

        <Link to={`/locations/${this.props._id}`}>
          <Button ButtonType="Success" clicked={this.props.update}>
            Modify
          </Button>
        </Link>
        <Button ButtonType="Failure" clicked={this.props.delete}>
          Delete
        </Button>
      </div>
    );
  }
}

export default googleAPIComponent({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ['places']
})(Location);
