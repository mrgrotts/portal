import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Button from '../../../../components/UI/Button/Button';
import TableRow from '../../../../components/UI/Table/TableRow';
import TableItem from '../../../../components/UI/Table/TableItem';

import CommercialCleaning from '../../../../assets/images/CommercialCleaning.jpg';
import DrywallInstallation from '../../../../assets/images/DrywallInstallation.jpg';
import Electrician from '../../../../assets/images/Electrician.jpg';
import FloorServices from '../../../../assets/images/FloorServices.jpg';
import Maintenance from '../../../../assets/images/Maintenance.jpg';
import Painter from '../../../../assets/images/Painter.jpg';
import Plumber from '../../../../assets/images/Plumber.jpg';
import PestControl from '../../../../assets/images/PestControl.jpg';
import PostConstruction from '../../../../assets/images/PostConstruction.jpg';
import ResidentialCleaning from '../../../../assets/images/ResidentialCleaning.jpg';

import classes from './Work.css';

const Work = props => {
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

  let matchCategory = category => images.find(image => image.includes(category));

  return (
    <TableRow>
      <TableItem>
        {props.category}
        <div className={classes.WorkCategory}>
          <img alt={props.category} className={classes.WorkImage} src={matchCategory(props.category.replace(/[^\w]/g, ''))} />
        </div>
      </TableItem>
      <TableItem>
        <Link to={`/work/${props._id}`}>{props._id}</Link>
      </TableItem>
      <TableItem>
        <p>{props.status}</p>
        {props.status === 'Unassigned' ? null : <p>{props.assignedTo}</p>}
      </TableItem>
      <TableItem>
        <Link to={`/locations/${props.location._id}`}>{props.location.name}</Link>
        <p>{props.location.addressOne}</p>
        <p>{props.location.addressTwo}</p>
        <p>
          {props.location.city}, {props.location.state} {props.location.zipcode}
        </p>
      </TableItem>
      <TableItem>{props.description}</TableItem>
      <TableItem>{moment(props.requestedDate).format('LLL')}</TableItem>
      <TableItem>
        <div className={classes.WorkActions}>
          <Link to={`/work/${props._id}`}>
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

export default Work;

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
