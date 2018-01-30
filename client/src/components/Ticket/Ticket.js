import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Button from '../UI/Button/Button';
import TableRow from '../UI/Table/TableRow';
import TableItem from '../UI/Table/TableItem';

import classes from './Ticket.css';

const Ticket = props => {
  return (
    <TableRow>
      <TableItem>
        <Link to={`/tickets/${props._id}`}>{props._id}</Link>
      </TableItem>
      <TableItem>{props.status}</TableItem>
      <TableItem>{props.category}</TableItem>
      <TableItem>{props.location.name}</TableItem>
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
