import React from 'react';

import MenuItem from './MenuItem/MenuItem';

import classes from './MenuItems.css';

const MenuItems = props => (
  <ul className={classes.MenuItems}>
    <MenuItem exact link="/">
      Dashboard
    </MenuItem>

    {props.isAuthenticated ? (
      <MenuItem exact link="/locations/create">
        Add Location
      </MenuItem>
    ) : null}

    {props.isAuthenticated ? (
      <MenuItem exact link="/work">
        Work
      </MenuItem>
    ) : null}

    {props.isAuthenticated ? (
      <MenuItem exact link="/locations">
        Locations
      </MenuItem>
    ) : null}

    {props.isAuthenticated ? (
      <MenuItem exact link="/logout">
        Logout
      </MenuItem>
    ) : (
      <MenuItem exact link="/login">
        Login
      </MenuItem>
    )}
  </ul>
);

export default MenuItems;
