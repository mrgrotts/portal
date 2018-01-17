import React from 'react';

import Button from '../UI/Button/Button';
import Map from '../UI/Maps';

import classes from './Location.css';

const Location = props => {
  return (
    <div className={classes.Location}>
      <h1>Location ID: {props._id}</h1>
      <p>
        {props.latitude}, {props.longitude}
      </p>
      <div style={{ height: '300px', width: '300px' }}>
        <Map id={props._id} latitude={41.88} longitude={-87.65} />
      </div>
      <p>{props.name}</p>
      <p>{props.addressOne}</p>
      <p>{props.addressTwo}</p>
      <p>
        {props.city}, {props.state} {props.zipcode}
      </p>

      <Button ButtonType="Success" clicked={props.update}>
        Modify
      </Button>
      <Button ButtonType="Failure" clicked={props.delete}>
        Delete
      </Button>
    </div>
  );
};

export default Location;
