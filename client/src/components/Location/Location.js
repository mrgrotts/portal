import React from 'react';
import { Link } from 'react-router-dom';

import { wrapper as googleAPIComponent } from '../../hoc/googleAPIComponent';

import Button from '../UI/Button/Button';
import Map from '../UI/Maps';
import Marker from '../UI/Maps/Marker/Marker';

import classes from './Location.css';

const Location = props => {
  // console.log(props.tickets);
  const style = { height: '100%', width: '100%' };

  let tickets;
  props.tickets
    ? (tickets = (
        <div>
          <h4>{props.tickets.length} Tickets</h4>
          {props.tickets.map(ticket => (
            <div key={ticket}>
              <Link to={`/tickets/${ticket}`}>{ticket}</Link>
            </div>
          ))}
        </div>
      ))
    : (tickets = (
        <div>
          <h4>No Tickets</h4>
          <p>No Tickets for this Location</p>
        </div>
      ));

  return (
    <div className={classes.Location}>
      <h1>Location ID: {props._id}</h1>
      <p>
        {props.latitude}, {props.longitude}
      </p>
      <div style={{ height: '300px', width: '300px' }}>
        <Map
          id={props._id}
          center={{ lat: props.latitude, lng: props.longitude }}
          google={props.google}
          onClick={props.onMapClicked}
          style={style}
          zoom={10}
        >
          <Marker
            name={'Test Marker'}
            onClick={props.onMarkerClick}
            position={{ lat: props.latitude, lng: props.longitude }}
          />
        </Map>
      </div>
      <p>{props.name}</p>
      <p>{props.addressOne}</p>
      <p>{props.addressTwo}</p>
      <p>
        {props.city}, {props.state} {props.zipcode}
      </p>
      {tickets}

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
