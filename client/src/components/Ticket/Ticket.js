import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Button from '../UI/Button/Button';
import TableRow from '../UI/Table/TableRow';
import TableItem from '../UI/Table/TableItem';

import CommercialCleaning from '../../assets/images/CommercialCleaning.jpg';
import DrywallInstallation from '../../assets/images/DrywallInstallation.jpg';
import Electrician from '../../assets/images/Electrician.jpg';
import FloorServices from '../../assets/images/FloorServices.jpg';
import Maintenance from '../../assets/images/Maintenance.jpg';
import Painter from '../../assets/images/Painter.jpg';
import Plumber from '../../assets/images/Plumber.jpg';
import PestControl from '../../assets/images/PestControl.jpg';
import PostConstruction from '../../assets/images/PostConstruction.jpg';
import ResidentialCleaning from '../../assets/images/ResidentialCleaning.jpg';

import classes from './Ticket.css';

const Ticket = props => {
  let images = [
    CommercialCleaning,
    DrywallInstallation,
    Electrician,
    FloorServices,
    Maintenance,
    Painter,
    Plumber,
    PestControl,
    PostConstruction,
    ResidentialCleaning
  ];

  let matchCategory = category =>
    images.find(image => image.includes(category));

  let address = `${props.location.addressOne} ${props.location.addressTwo} ${
    props.location.city
  } ${props.location.state} ${props.location.zipcode}`;

  console.log(address);

  return (
    <TableRow>
      <TableItem>
        {props.category}
        <div className={classes.TicketCategory}>
          <img
            alt={props.category}
            className={classes.TicketImage}
            src={matchCategory(props.category.replace(/[^\w]/g, ''))}
          />
        </div>
      </TableItem>
      <TableItem>
        <Link to={`/tickets/${props._id}`}>{props._id}</Link>
      </TableItem>
      <TableItem>
        <p>{props.status}</p>
        {props.status === 'Unassigned' ? null : <p>{props.assignedTo}</p>}
      </TableItem>
      <TableItem>
        <Link to={`/locations/${props.location._id}`}>
          {props.location.name}
        </Link>
        <p>{props.location.addressOne}</p>
        <p>{props.location.addressTwo}</p>
        <p>
          {props.location.city}, {props.location.state} {props.location.zipcode}
        </p>
      </TableItem>
      <TableItem>{props.description}</TableItem>
      <TableItem>{moment(props.requestedDate).format('LLL')}</TableItem>
      <TableItem>
        <div className={classes.TicketActions}>
          <Link to={`/tickets/${props._id}`}>
            <Button ButtonType="Success" clicked={props.update}>
              Modify
            </Button>
          </Link>
          <Button ButtonType="Failure" clicked={props.delete}>
            Delete
          </Button>
        </div>
      </TableItem>
    </TableRow>
  );
};

export default Ticket;

// <TableItem>
//   <img src={`../../assets/images/${props.category.replace(/[^\w]/g, '')}.jpg`} alt={`${props.category}`} />
// </TableItem>;

// <a href={`https://www.google.com/maps/place/${encodeURIComponent(address)}`}>
//   <p>{props.location.addressOne}</p>
//   <p>{props.location.addressTwo}</p>
//   <p>
//     {props.location.city}, {props.location.state} {props.location.zipcode}
//   </p>
// </a>;
