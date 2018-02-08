import React from 'react';

import MenuItem from './MenuItem/MenuItem';

import classes from './MenuItems.css';

const MenuItems = props => (
  <ul className={classes.MenuItems}>
    <MenuItem exact link="/">
      Dashboard
    </MenuItem>

    {props.isAuthenticated ? <MenuItem link="/locations/create">Add Location</MenuItem> : null}

    {props.isAuthenticated ? <MenuItem link="/work">Work</MenuItem> : null}

    {props.isAuthenticated ? <MenuItem link="/locations">Locations</MenuItem> : null}

    {props.isAuthenticated ? <MenuItem link="/logout">Logout</MenuItem> : <MenuItem link="/login">Login</MenuItem>}
  </ul>
);

export default MenuItems;
