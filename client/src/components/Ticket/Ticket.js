import React from 'react';
import { Link } from 'react-router-dom';

import { wrapper as googleAPIComponent } from '../../hoc/googleAPIComponent';

import Button from '../UI/Button/Button';
import Map from '../UI/Maps';
import InfoWindow from '../UI/Maps/InfoWindow/InfoWindow';
import Marker from '../UI/Maps/Marker/Marker';
import ProgressBar from '../UI/ProgressBar/ProgressBar';

import classes from './Ticket.css';

const Ticket = props => {
  const style = { height: '100%', width: '100%' };

  let position = { lat: 41.88, lng: -87.65 };

  return (
    <div className={classes.Ticket}>
      <h1>Ticket ID: {props._id}</h1>
      <p>Status: {props.status}</p>
      <ProgressBar />
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
            position={props.position}
          />
        </Map>
      </div>
      <p>Location: {props.location}</p>
      <p>Category: {props.category}</p>
      <p>Description: {props.description}</p>
      <p>Created By: {props.userId}</p>
      <p>Created At: {props.createdAt}</p>
      <p>Updated At: {props.updatedAt}</p>
      <Link to={`/tickets/${props._id}`}>
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
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  libraries: ['places']
})(Ticket);

// <Map
//   id={props._id}
//   location={props.location}
//   latitude={41.88}
//   longitude={-87.65}
// />
