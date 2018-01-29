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
            <div key={ticket._id}>
              <p>
                <Link to={`/tickets/${ticket._id}`}>
                  <strong>{ticket._id}: </strong>
                </Link>
                {ticket.description}
              </p>
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
      <div className={classes.LocationMap}>
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
      <h1>
        <strong>{props.name}</strong>
      </h1>
      <h4>{props._id}</h4>
      <p>
        <a href={`tel:${props.phone}`}>{props.phone}</a>
      </p>
      <p>{props.addressOne}</p>
      <p>{props.addressTwo}</p>
      <p>
        {props.city}, {props.state} {props.zipcode}
      </p>
      <p>
        {props.latitude}, {props.longitude}
      </p>
      <hr style={{ margin: '5px 0' }} />
      {tickets}
      <p>Created By: {props.userId.email}</p>
      <p>Created At: {props.createdAt}</p>
      <p>Updated At: {props.updatedAt}</p>

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
