import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';
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

export default Ticket;
