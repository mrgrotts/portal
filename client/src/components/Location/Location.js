import React from 'react';
import { Link } from 'react-router-dom';

import { wrapper as googleAPIComponent } from '../../hoc/googleAPIComponent';

import Button from '../UI/Button/Button';
import Map from '../UI/Maps';
import Marker from '../UI/Maps/Marker/Marker';

import classes from './Location.css';

const Location = props => {
  const style = { height: '100%', width: '100%' };

  let position = { lat: 41.88, lng: -87.65 };

  return (
    <div className={classes.Location}>
      <h1>Location ID: {props._id}</h1>
      <h4>{props.tickets.length} Tickets</h4>
      <p>
        {props.latitude}, {props.longitude}
      </p>
      <div style={{ height: '300px', width: '300px' }}>
        <Map
          id={props._id}
          google={props.google}
          onClick={props.onMapClicked}
          style={style}
          zoom={10}
        >
          <Marker
            name={'Test Marker'}
            onClick={props.onMarkerClick}
            position={position}
          />
        </Map>
      </div>
      <p>{props.name}</p>
      <p>{props.addressOne}</p>
      <p>{props.addressTwo}</p>
      <p>
        {props.city}, {props.state} {props.zipcode}
      </p>

      <Link to={`/locations/${props._id}`}>
        <Button ButtonType="Success" clicked={props.update}>
          Modify
        </Button>
      </Link>
      <Button ButtonType="Failure" clicked={props.delete}>
        Delete
      </Button>
    </div>
  );
};

export default googleAPIComponent({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ['places']
})(Location);
