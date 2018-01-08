import React from 'react';

import Map from '../UI/Map/Map';
import ProgressBar from '../UI/ProgressBar/ProgressBar';

import classes from './Ticket.css';

const Ticket = props => {
  return (
    <div className={classes.Ticket}>
      <h1>Ticket ID: {props._id}</h1>
      <p>Status: {props.status}</p>
      <ProgressBar />
      <div style={{ height: '300px', width: '300px' }}>
        <Map
          id={props._id}
          location={props.location}
          latitude={41.88}
          longitude={-87.65}
        />
      </div>
      <p>Location: {props.location}</p>
      <p>Description: {props.description}</p>
      <p>Received On: {props.dateReceived}</p>
      <p>Created By: {props.userId}</p>
      <p>Created At: {props.createdAt}</p>
      <p>Updated At: {props.updatedAt}</p>
    </div>
  );
};

export default Ticket;
