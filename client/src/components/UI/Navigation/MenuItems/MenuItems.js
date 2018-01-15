import React from 'react';

import MenuItem from './MenuItem/MenuItem';

import classes from './MenuItems.css';

const MenuItems = props => (
  <ul className={classes.MenuItems}>
    <MenuItem exact link="/">
      Schedule Job
    </MenuItem>

    {props.isAuthenticated ? (
      <MenuItem link="/tickets">Tickets</MenuItem>
    ) : null}

    {props.isAuthenticated ? (
      <MenuItem link="/logout">Logout</MenuItem>
    ) : (
      <MenuItem link="/login">Login</MenuItem>
    )}
  </ul>
);

export default MenuItems;

// {props.isAuthenticated ? (
//   <MenuItem link="/tickets/create">Create Ticket</MenuItem>
// ) : null}
