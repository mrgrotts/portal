import React from 'react';

import MenuItem from './MenuItem/MenuItem';

import classes from './MenuItems.css';

const MenuItems = props => (
  <ul className={classes.MenuItems}>
    {props.isAuthenticated ? (
      <MenuItem exact link="/dashboard">
        Dashboard
      </MenuItem>
    ) : (
      <MenuItem exact link="/">
        Home
      </MenuItem>
    )}

    {/* {props.isAuthenticated ? (
      <MenuItem exact link="/locations/create" disabled={!props.verified}>
        Add Location
      </MenuItem>
    ) : null} */}

    {props.isAuthenticated ? (
      <MenuItem exact link="/work" disabled={!props.verified}>
        Work
      </MenuItem>
    ) : null}

    {props.isAuthenticated ? (
      <MenuItem exact link="/locations" disabled={!props.verified}>
        Locations
      </MenuItem>
    ) : null}

    {props.isAuthenticated ? (
      props.company ? (
        <MenuItem exact link={`/companies/${props.company}`}>
          Company
        </MenuItem>
      ) : (
        <MenuItem exact link="/companies/create">
          Add Company
        </MenuItem>
      )
    ) : null}

    {props.isAuthenticated ? (
      <MenuItem exact link="/logout">
        Logout
      </MenuItem>
    ) : (
      <MenuItem exact link="/login" verified={props.verified}>
        Login
      </MenuItem>
    )}
  </ul>
);

export default MenuItems;
