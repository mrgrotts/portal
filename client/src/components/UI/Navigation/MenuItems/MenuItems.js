import React from 'react';

import MenuItem from './MenuItem/MenuItem';

import classes from './MenuItems.css';

const MenuItems = props => (
  <ul className={classes.MenuItems}>
    <MenuItem exact link="/">
      Dashboard
    </MenuItem>

    <MenuItem link="/autocomplete">Autocomplete</MenuItem>

    {props.isAuthenticated ? (
      <MenuItem link="/tickets">Tickets</MenuItem>
    ) : null}

    {props.isAuthenticated ? (
      <MenuItem link="/locations">Locations</MenuItem>
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
